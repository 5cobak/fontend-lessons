$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-date-dropdown__input');
  inputs.forEach((input) => {
    const $firstInput = $(input);
    const $secondInput = $firstInput.parent().next().find('input');

    function onSelect(formattedDate) {
      const secondDate = formattedDate.split(',')[1];
      if (!secondDate) return;
      $secondInput.val(secondDate);
    }

    $firstInput.datepicker({
      // startDate: new Date(2019, 7, 1),
      // inline: true,
      showEvent: 'click',
      offset: 5,
      range: true,
      onSelect: (formattedDate) => {
        onSelect(formattedDate);
      },
      clearButton: true,
      navTitles: {
        days: 'MM<br>yyyy',
      },
    });
    const $calendarEl = $firstInput.datepicker().data('datepicker').$datepicker;
    function onFocusSecondInput() {
      $firstInput.trigger('click');
    }

    $secondInput.on('click', onFocusSecondInput);

    function clearInputVal() {
      $secondInput.val('');
    }
    const $clearButton = $calendarEl.find('.datepicker--button');
    const $buttonsParent = $calendarEl.find('.datepicker--buttons');
    $buttonsParent.append('<span class="datepicker--button-access">Применить</span>');
    $clearButton.on('click', clearInputVal);

    const $buttonAcces = $clearButton.next();

    function onClickButtonAcces() {
      $firstInput.datepicker().data('datepicker').hide();
    }

    $buttonAcces.on('mouseup', onClickButtonAcces);
  });
});
