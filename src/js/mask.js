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
	function maskForRangeDate(input1,input2) {
		input1.mask('00.00.0000');
		input2.mask('00.00.0000');
		const $regDate = "(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\\d\\d)";
		function isValid(element, pat) {
			let value = element.val();

			let pattern =  new RegExp("^"+pat+"","i");
			if (pattern.test(element) && element != "") {
				return true;
			}
			else {
				return false;
			}
		}

		input1.change( function(){
			console.log(input1.val());
			/*запускаем нашу функцию проверки. Передаем идентификатор input и шаблон выражения*/

			if(input1.val() != "" && input2.val() != ""){
				input1.parent().parent().find('.bad-value').remove();
				input1.parent().parent().find('.br').remove();
			}
			else {
				input1.parent().parent().find('.bad-value').remove();
				input1.parent().parent().find('.br').remove();
				input1.parent().parent().append('<br class="br"><span class="bad-value">Заполните все поля.<span>');
				input1.hasClass('date-dropdown-2') ? input1.val() : input1.val("");
			}

		});


	};

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
	};
	let start1 = $('.datepicker-here.date-start-1');
	let end1 = $('.date-end-1');
	let start2 = $('.date-start-2');
	let end2 = $('.date-end-2');

	maskForDate($('.date-field-1'));
	maskForDate($('.datepicker-here.date-dropdown-2'));
	maskForRangeDate(start1,end1);
	maskForRangeDate(start2,end2);
	maskForEmail($('.email'));
});

