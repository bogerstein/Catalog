
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
  // console.log(data);

  text = "<table id=\"link-table\" width=\"100%\">";
  for (i = 0; i < data["items"].length; i++) { 
    text += "<tr><td id=\"rid\" style=\"display:none;\">";
    // text += data["items"][i]["id"];
    text += i;
    text += "</td><td><img src=";
    text += data["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"];
    text += " width=\"128\" height=\"192\"></td><td><p>";
    text += data["items"][i]["volumeInfo"]["title"] + "(" + data["items"][i]["volumeInfo"]["publishedDate"] + ")";
    text += "</p></td></tr>";
  }
  text += "</table>";

  document.getElementById("livesearch_results").innerHTML=text;

  $('#link-table').data('rawData',data);

  // Apply a class on mouse over and remove it on mouse out.
  $('#link-table tr').hover(function () {
    $(this).toggleClass('highlight');
  });

  // Assign a click handler that grabs the URL 
  // from the first cell and redirects the user.
  $('#link-table tr').click(function () {
    modalState = "view";

    daterz = $('#link-table').data('rawData');
    console.log(daterz);
    // console.log($(this));
    rid = $(this).find('td#rid').text();
    console.log(daterz["items"][rid]);


    // http://www.librarything.com/api/thingISBN/9781781100295
    // isbn = daterz["items"][rid]["volumeInfo"]["industryIdentifiers"][0]["identifier"];
    // console.log("isbn: " + isbn)
    //$.get( "http://www.librarything.com/api/thingISBN/9780804139038", function( data2 ) {
    //  console.log(data2);
    //});

  //$.ajax({
  //   url: "http://www.librarything.com/api/thingISBN/9781781100295",
  //   xhrFields: {
  //    withCredentials: true
 // }
  //}).done(function (data) {
   // console.log(data);
  //});


    $("#book_title ").val(daterz["items"][rid]["volumeInfo"]["title"]);
    $("#book_author ").val(daterz["items"][rid]["volumeInfo"]["authors"][0]);
    $("#book_description ").val(daterz["items"][rid]["volumeInfo"]["description"]);
    $("#book_pages ").val(daterz["items"][rid]["volumeInfo"]["pageCount"]);
    $("#book_release_date ").val(daterz["items"][rid]["volumeInfo"]["publishedDate"]);
    $("#book_link ").val(daterz["items"][rid]["selfLink"]);
    $("#book_big_image ").val(daterz["items"][rid]["volumeInfo"]["imageLinks"]["thumbnail"]);
    $("#book_small_image ").val(daterz["items"][rid]["volumeInfo"]["imageLinks"]["smallThumbnail"]);

    $("#bookBigImage").attr('src', daterz["items"][rid]["volumeInfo"]["imageLinks"]["thumbnail"]);
    $("#bookTitle").html(daterz["items"][rid]["volumeInfo"]["title"]);
    $("#bookAuthor").html(daterz["items"][rid]["volumeInfo"]["authors"][0]);

    $('#search').toggle( "slide" );
    $('#createBook').toggle( "slide" );
  });
});
}

function showModal() {
  modalState = "search";
  $('#search_modal').on('hidden.bs.modal', function () {
    console.log("hidden");
    document.getElementById("livesearch_query").value="";
    document.getElementById("livesearch_results").innerHTML="";
    document.getElementById("livesearch_results").style.border="0px";

    if (modalState == "view") {
      $('#search').toggle( "slide" );
      $('#createBook').toggle( "slide" );
    }

    modalState = "hidden";
  });

  document.getElementById('livesearch_query').focus();
}

function getBigImage() {
  val = $("#book_big_image ").val();
  console.log(val);
}

$(document).ready(function() {
    $("#search_modal").on('shown.bs.modal', function() {
        $('#livesearch_query').focus();
    });
});




