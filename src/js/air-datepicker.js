$(document).ready(function(){
		// air-datePicker 

	$('.datepicker-here.date-dropdown-1').datepicker({
		// minDate: new Date()
		clearButton: true
	});
	$('.datepicker-here.date-dropdown-2').datepicker({
		// minDate: new Date()
		clearButton: true,
		range: true,
		dateFormat: "d M",
		multipleDatesSeparator: " - ",
		// inline: true
	});
	const myDatepicker1 = $('.datepicker-here.date-dropdown-1').datepicker().data('datepicker');
	const myDatepicker2 = $('.datepicker-here.date-dropdown-2').datepicker().data('datepicker');

	$('.datepicker').find('.datepicker--button-apply').click(function(){
		myDatepicker1.hide();
		myDatepicker2.hide();
	});

	// keypress off on filter date dropdown
	$('.date-dropdown-2').keypress(function(){
		return false;
	});
	// add style for range elements in 

	$(document).click(function(){
		if($('.-range-to-').hasClass('-selected-')) {
				$('.-range-from-').find('.after-range-from').remove();
			  $('.-range-to-').find('.after-range-to').remove();
				$('.-range-from-').append('<div class="after-range-from"></div>');
				$('.-range-to-').append('<div class="after-range-to"></div>');
			}
			else {
				$('.-range-from-').find('.after-range-from').remove();
			  $('.-range-to-').find('.after-range-to').remove();
			}
		if($('.-range-to-').hasClass('-selected-')) {
			$('.-range-from-').find('.after-range-from').remove();
			$('.-range-to-').find('.after-range-to').remove();
			$('.-range-from-').append('<div class="after-range-from"></div>');
			$('.-range-to-').append('<div class="after-range-to"></div>');
		}
	});
	
  
	// change fill svg when focus or blur on .input-wrapper
	$('.input-wrapper__input').focus(function(){
		$(this).parent().find('svg').css('fill','rgba(31, 32, 65, 0.75)');
	});
		$('.input-wrapper__input').blur(function(){
		$(this).parent().find('svg').css('fill','rgba(31, 32, 65, 0.5)');
	});
	$('.iqdropdown-selection').focus(function(){
		$(this).parent().find('svg').css('fill','rgba(31, 32, 65, 0.75)');
	});
		$('.iqdropdown-selection').blur(function(){
		$(this).parent().find('svg').css('fill','rgba(31, 32, 65, 0.5)');
	});

	// rotate svg-icon in input-elements
	$(".input-wrapper_input").focus(function(){
			$(this).parent().toggleClass("input-wrapper_focus");
	});
});


