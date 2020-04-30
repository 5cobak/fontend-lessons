$(document).ready(function(){
		// air-datePicker 
	const myDatepicker1 = $('.datepicker-here.date-dropdown-1').datepicker().data('datepicker');
	const myDatepicker2 = $('.datepicker-here.date-dropdown-2').datepicker().data('datepicker');
	const myDatepicker3 = $('.datepicker-here.date-dropdown-2').datepicker().data('datepicker');

	$('.datepicker-here.date-dropdown-1').datepicker({
		// minDate: new Date()
		clearButton: true,
		onShow: function(){
			myDatepicker1.$datepicker.hasClass('active') ? myDatepicker1.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
		: myDatepicker1.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
	},
		onHide: function(){
			myDatepicker1.$datepicker.hasClass('active') ? myDatepicker1.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
		: myDatepicker1.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
		}
	});

	$('.card.datepicker-here').datepicker({
		// minDate: new Date()
		inline: true,
		clearButton: true,
		range: true,
	});

// let cloneDatepicker = $(myDatepicker1).clone(true);

	$('.datepicker-here.date-dropdown-2').datepicker({
		// minDate: new Date()
		clearButton: true,
		range: true,
		dateFormat: "d M",
		multipleDatesSeparator: " - ",
		onShow: function(){
			myDatepicker2.$datepicker.hasClass('active') ? myDatepicker2.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
		: myDatepicker2.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
	},
		onHide: function(){
			myDatepicker2.$datepicker.hasClass('active') ? myDatepicker2.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
		: myDatepicker2.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
		}

		// 	$('.datepicker-here.date-dropdown-2').parent().find('svg.expand-more').removeClass('expand-more_active')
		// inline: true
	});


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
	// $('.input-wrapper__input').focus(function(e){
	// 	if($(this).parent().find('svg.expand-more').hasClass('expand-more_active')){
	// 		$(this).parent().find('svg.expand-more').removeClass('expand-more_active');
	// 	}else $(this).parent().find('svg.expand-more').addClass('expand-more_active');
		
	// });
	// $('.input-wrapper__input').blur(function(){
	// 	$(this).parent().find('svg.expand-more').removeClass('expand-more_active');
	// });
	$('.iqdropdown-selection').focus(function(){
		$(this).parent().find('svg').css('fill','rgba(31, 32, 65, 0.75)');
	});
		$('.iqdropdown-selection').blur(function(){
		$(this).parent().find('svg').css('fill','rgba(31, 32, 65, 0.5)');
	});
});


