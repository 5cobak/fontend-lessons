// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

//svg-sprite-loader

function requireAll(r) {
	r.keys().forEach(r);
}

requireAll(require.context('../assets/img/icons/', true, /\.svg$/));


fetch(`https://mycdn.com/img/icons.svg`).then(res => {
	return res.text();
}).then(data => {
	document.getElementById('svg-icons').innerHTML = data;
});


// item-quantity-dropdown js



// mask 

$(document).ready(function(){
	function maskDate(input) {
		input.mask('00.00.0000');
		const $regDate = "(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\\d\\d)";
		function isValid(element, pat) {
			let value = input.val();
			let pattern =  new RegExp("^"+pat+"","i");
			if (pattern.test(value) && value != "" || value.length > 12) {
				return true;
			}
			else {
				return false;
			}
		}

		input.change( function(){
			let $dateField = $(this);
			/*запускаем нашу функцию проверки. Передаем идентификатор input и шаблон выражения*/
			let date = isValid($dateField, $regDate);
				if(date){
					$dateField.parent().parent().find('.bad-value').remove();
					$dateField.parent().parent().find('.br').remove();
				}
				else {
					$dateField.parent().parent().find('.bad-value').remove();
					$dateField.parent().parent().find('.br').remove();
					$dateField.parent().parent().append('<br class="br"><span class="bad-value">Неправильные данные. Попробуйте еще раз.<span>');
					$dateField.hasClass('.date-dropdown-2') ? $dateField.val() : $dateField.val();
				}
		});
	}
	maskDate($('.date-field-1'));
	maskDate($('.datepicker-here.date-dropdown-1'));
	maskDate($('.datepicker-here.date-dropdown-2'));

	

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
		multipleDatesSeparator: " - "
	});
	const myDatepicker1 = $('.datepicker-here.date-dropdown-1').datepicker().data('datepicker');
	const myDatepicker2 = $('.datepicker-here.date-dropdown-2').datepicker().data('datepicker');

	$('.datepicker').find('.datepicker--button-apply').click(function(){
		myDatepicker1.hide();
		myDatepicker2.hide();
	});

	// keypress off on range date
	$('.date-dropdown-2').keypress(function(){
		return false;
	});
	// $('.datepicker-here.date-dropdown-2').change(function(){
	// 	console.log($(this).val().length);
	// 	if($(this).val().length < 12) {
	// 		$(this).parent().parent().find('.bad-value').remove();
	// 		$(this).parent().parent().find('.br').remove();
	// 		$(this).parent().parent().append('<br class="br"><span class="bad-value">Неправильно введенные данные. Попробуйте еще раз.<span>');
	// 		$(this).val("");
	// 	}
	// 	else {
	// 		$(this).parent().parent().find('.bad-value').remove();
	// 		$(this).parent().parent().find('.br').remove();
	// 	}
	// });

	// air-datePicker 

	// $('.datepicker-here').datepicker();

	// Доступ к экземпляру объекта
	// $('.datepicker-here').data('datepicker');

});


