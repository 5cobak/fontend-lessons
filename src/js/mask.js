$(document).ready(function(){
	function maskForDate(input) {
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
					$dateField.parent().parent().append('<br class="br"><span class="bad-value">Заполните, пожалуйста, корректно.<span>');
					$dateField.hasClass('date-dropdown-2') ? $dateField.val() : $dateField.val("");
				}
		});
	}
	function maskForEmail(input){
		const $regDate = "@.";
		function isValid(element, pat) {
			let value = input.val();
			let pattern =  new RegExp(pat);
			if (pattern.test(value) && value != "") {
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
					$dateField.parent().parent().append('<br class="br"><span class="bad-value">Заполните, пожалуйста, корректно.<span>');
					$dateField.val("");
				}
		});
	}

	maskForDate($('.date-field-1'));
	maskForDate($('.datepicker-here.date-dropdown-1'));
	maskForDate($('.datepicker-here.date-dropdown-2'));
	maskForEmail($('.email'));
	
});
	
