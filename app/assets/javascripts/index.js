/*

$("div").hover(function(){
	if (!$(this).hasClass('animated')) {
		$(this).dequeue().stop().animate({ width: "200px" });
	}
}, function() {
    $(this).addClass('animated').animate({ width: "100px" }, "normal", "linear", function() {
		$(this).removeClass('animated').dequeue();
	});
});

*/