$(document).ready(function(){
		// air-datePicker 
		let start1 = $('.datepicker-here.date-start-1');
		let end1 = $('.date-end-1');
		let start2 = $('.date-start-2');
		let end2 = $('.date-end-2');
		

		// const myDatepicker1 = $start.datepicker().data('datepicker');
		const myDatepicker2 = $('.datepicker-here.date-dropdown-2').datepicker().data('datepicker');
	// $('.datepicker-here.date-dropdown-start').datepicker({
	// 	// minDate: new Date()
	// 	clearButton: true,
	// 	onShow: function(){
	// 		myDatepicker1.$datepicker.hasClass('active') ? myDatepicker1.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
	// 	: myDatepicker1.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
	// },
	// 	onHide: function(){
	// 		myDatepicker1.$datepicker.hasClass('active') ? myDatepicker1.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
	// 	: myDatepicker1.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
	// 	}
	// });

// double input date-picker
let isPickerVisible1 = false;
let isPickerVisible2 = false;
function setDatePicker(start, end, isVisible) {
	start.datepicker({
		clearButton: true,
		range: true,
		onSelect: function (fd, date, picker) {
			start.val(start.data('datepicker')._prevOnSelectValue.slice(0,10));
			console.log(start.length)
			end.val(start.data('datepicker')._prevOnSelectValue.slice(10));
		// console.log(myDatepicker1.visible);	
	},
	multipleDatesSeparator: "",
	onShow: function(dp, complete) {
		if(complete)
			isVisible = true;
	},
	onHide: function(dp, complete) {
		start.val(start.data('datepicker')._prevOnSelectValue.slice(0,10));
		if(complete)
			isVisible = false;
	}
});

	$(start).on('click', () => {
		if(isVisible)
			start.data('datepicker').hide();
		else // invisibile
			start.data('datepicker').show();	
});
	$(end).on('click', () => {
		if(isVisible)
			start.data('datepicker').hide();
		else // invisibile
			start.data('datepicker').show();
});

}
// set double input date-picker

setDatePicker(start1,end1,isPickerVisible1);
setDatePicker(start2,end2,isPickerVisible1);




$('.card.datepicker-here').datepicker({
		// minDate: new Date()
		inline: true,
		clearButton: true,
		range: true,
	});

// let cloneDatepicker = $(myDatepicker1).clone(true);

	// $('.datepicker-here.date-dropdown-end').datepicker({
	// 	// minDate: new Date()
	// 	clearButton: true,
	// 	range: true,
	// 	dateFormat: "d M",
	// 	multipleDatesSeparator: " - ",
	// 	onShow: function(){
	// 		myDatepicker2.$datepicker.hasClass('active') ? myDatepicker2.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
	// 	: myDatepicker2.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
	// },
	// 	onHide: function(){
	// 		myDatepicker2.$datepicker.hasClass('active') ? myDatepicker2.$el.parent().find('svg.expand-more').addClass('expand-more_active') 
	// 	: myDatepicker2.$el.parent().find('svg.expand-more').removeClass('expand-more_active');
	// 	}

	// 	// 	$('.datepicker-here.date-dropdown-2').parent().find('svg.expand-more').removeClass('expand-more_active')
	// 	// inline: true
	// });

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
		$('.datepicker-here').datepicker().data('datepicker').hide();
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


