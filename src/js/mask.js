// eslint-disable-next-line
$(document).ready(function() {
  function maskForDate(input) {
    input.mask('00.00.0000');
    const $regDate = '(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\\d\\d)';
    function isValid(element, pat) {
      const value = input.val();
      const pattern = new RegExp(`^${pat}`, 'i');
      if (pattern.test(value) && value !== '') {
        return true;
      }

      return false;
    }
    // eslint-disable-next-line
    input.change(function() {
      const $dateField = $(this);
      /* запускаем нашу функцию проверки. Передаем идентификатор input и шаблон выражения */
      const date = isValid($dateField, $regDate);
      if (date) {
        $dateField.parent().parent().find('.bad-value').remove();
        $dateField.parent().parent().find('.br').remove();
      } else {
        $dateField.parent().parent().find('.bad-value').remove();
        $dateField.parent().parent().find('.br').remove();
        $dateField.parent().parent().append('<br class="br"><span class="bad-value">Заполните, пожалуйста, корректно.<span>');
        if ($dateField.hasClass('date-dropdown-2')) $dateField.val();
        else $dateField.val('');
      }
    });
  }

  function maskForEmail(input) {
    const $regDate = '@.';
    function isValid(element, pat) {
      const value = input.val();
      const pattern = new RegExp(pat);
      if (pattern.test(value) && value !== '') {
        return true;
      }

      return false;
    }
    // eslint-disable-next-line
    input.change(function() {
      const $dateField = $(this);
      /* запускаем нашу функцию проверки. Передаем идентификатор input и шаблон выражения */
      const date = isValid($dateField, $regDate);
      if (date) {
        $dateField.parent().parent().find('.bad-value').remove();
        $dateField.parent().parent().find('.br').remove();
      } else {
        $dateField.parent().parent().find('.bad-value').remove();
        $dateField.parent().parent().find('.br').remove();
        $dateField.parent().parent().append('<br class="br"><span class="bad-value">Заполните, пожалуйста, корректно.<span>');
        $dateField.val('');
      }
    });
  }
  // const start1 = $('.datepicker-here.date-start-1');
  // const end1 = $('.date-end-1');
  // const start2 = $('.datepicker-here.date-start-2');
  // const end2 = $('.date-end-2');

  maskForDate($('.date-field-1'));
  maskForDate($('.datepicker-here.date-dropdown-2'));
  // maskForRangeDate(start1, end1);
  // maskForRangeDate(start2, end2);
  maskForEmail($('.email'));
});
