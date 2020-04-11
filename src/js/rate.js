$(document).ready(function(){
	let currentStar;
	let arrayStar = [];
	let star = '<svg class="rate__star"><use xlink:href="#star"></use></svg>';
	let starFull = '<svg class="rate__star rate__star_full"><use xlink:href="#star-full"></use></svg>';
	let checkedInputStar;
	$('.rate__rating').click(function(e){
		// e.stopPropagation();
	});

	$('.rate__star-wrap').click(function(){
		
		$(this).toggleClass('rate__star-wrap_rated');
		if($(this).hasClass('rate__star-wrap_rated')) {

			$(this).find("input").attr('checked', 'true');
			currentStar = $(this).find(".rate__rating").val();
			arrayStar = $(this).parent().find('.rate__star');

			$.each(arrayStar, function(index,value){	

				if(index < currentStar) {
					$(value).replaceWith(starFull);		
				} else $(value).replaceWith(star);
			});

		}else {
			$(this).find("input").attr('checked', 'true');
			currentStar = $(this).find(".rate__rating").val();
			arrayStar = $(this).parent().find('.rate__star');

			$.each(arrayStar, function(index,value){	
				// $(value).replaceWith(star);
			});
		}
		
	});
});