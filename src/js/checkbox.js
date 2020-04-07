$(document).ready(function(){
	// $('input[type="radio"').change(function(){
	// 	if($(this).checked(true)) {

	// 	}
	// });
	$(".checkbox-wrapper__head").click(function(e){
		e.stopPropagation();
		$(this).parent().find("ul").toggleClass("checkbox-wrapper__ul_show");
		$(this).toggleClass("checkbox-wrapper__head_active");
	});
	// disabled propogation in checkbox
	$(".checkbox-wrapper__label input").click(function(e){
		e.stopPropagation();
	});

	$(document).click(function(e){

		$(".checkbox-wrapper__head").parent().find("ul").removeClass("checkbox-wrapper__ul_show");
		$(".checkbox-wrapper__head").removeClass("checkbox-wrapper__head_active");
	});

	$(".checkbox-wrapper").click(function(e){
		e.stopPropagation();
	});
});