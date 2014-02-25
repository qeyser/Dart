function refreshSize(){
	$('#img').css({
		width: $(window).width(),
		height: $(window).height()
	});
}
$(document).ready(function(e) {
	refreshSize();
	$(window).resize(function(e) {
		refreshSize();
	});
	$("#logo").stop().delay(800).fadeIn(300);
    $("#bottom").stop().delay(1000).fadeIn(300);
    $("#develop").stop().delay().fadeIn(500);
    $("#design").stop().delay(500).fadeIn(500);	
});