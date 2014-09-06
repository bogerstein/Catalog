
$(document).ready(function(){

  $(document).bind('ajaxError', 'form#new_book', function(event, jqxhr, settings, exception){

    // note: jqxhr.responseJSON undefined, parsing responseText instead
    $(event.data).render_form_errors( $.parseJSON(jqxhr.responseText) );

  });

});

(function($) {

  $.fn.modal_success = function(){
    // close modal
    this.modal('hide');

    // clear form input elements
    // todo/note: handle textarea, select, etc
    this.find('form input[type="text"]').val('');

    // clear error state
    this.clear_previous_errors();
  };

  $.fn.render_form_errors = function(errors){

    $form = this;
    this.clear_previous_errors();
    model = this.data('model');

    // show error messages in input form-group help-block
    $.each(errors, function(field, messages){
      $input = $('input[name="' + model + '[' + field + ']"]');
      $input.closest('.form-group').addClass('has-error').find('.help-block').html( messages.join(' & ') );
    });

  };

  $.fn.clear_previous_errors = function(){
    $('.form-group.has-error', this).each(function(){
      $('.help-block', $(this)).html('');
      $(this).removeClass('has-error');
    });
  }

}(jQuery));


function showResult(str) {
  if (str.length < 3) { 
    document.getElementById("livesearch_results").innerHTML="";
    document.getElementById("livesearch_results").style.border="0px";
    return;
  }

  endpoint = "https://www.googleapis.com/books/v1/volumes?q=" + str + "&startIndex=0&maxResults=10&key=AIzaSyB1aJSV6ene1f1VlF4wHzaHwd2lHcMYLEo"

  console.log(str);
  //console.log(endpoint);

  $.get( encodeURI(endpoint), function( data ) {
    console.log(data);

    text = "<table id=\"link-table\">";
    for (i = 0; i < data["items"].length; i++) { 
      text += "<tr><td id=\"bid\" style=\"display:none;\">";
      text += data["items"][i]["id"];
      text += "</td><td><img src=";
      text += data["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"];
      text += " width=\"128\" height=\"192\"></td><td><p>";
      text += data["items"][i]["volumeInfo"]["title"] + "(" + data["items"][i]["volumeInfo"]["publishedDate"] + ")";
      text += "</p></td></tr>";
    }
    text += "</table>";

    document.getElementById("livesearch_results").innerHTML=text;

    // Apply a class on mouse over and remove it on mouse out.
    $('#link-table tr').hover(function () {
      $(this).toggleClass('highlight');
    });

    // Assign a click handler that grabs the URL 
    // from the first cell and redirects the user.
    $('#link-table tr').click(function () {
      bid = $(this).find('td#bid').text();
      console.log(bid);
    });

  });
}

function destroyJsFunction() {
  $('#search_modal').on('hidden.bs.modal', function () {
    document.getElementById("livesearch_query").value="";
    document.getElementById("livesearch_results").innerHTML="";
    document.getElementById("livesearch_results").style.border="0px";
  });
}








