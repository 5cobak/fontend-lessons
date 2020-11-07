$(document).ready(() => {
  const $inputFilterDate = $('#js-filter-date');
  let newFormat;
  $inputFilterDate.datepicker({
    showEvent: 'click',
    offset: 5,
    range: true,
    clearButton: true,
    dateFormat: 'd M',
    onSelect: (formattedDate) => {
      newFormat = formattedDate.split(',').join(' - ');
      $inputFilterDate.val(newFormat);
    },
    onHide: () => {
      $inputFilterDate.val(newFormat);
    },
  });
  const $calendarEl = $inputFilterDate.datepicker().data('datepicker').$datepicker;
  function onFocusSecondInput() {
    $inputFilterDate.trigger('click');
  }

  const $clearButton = $calendarEl.find('.datepicker--button');
  const $buttonsParent = $calendarEl.find('.datepicker--buttons');
  $buttonsParent.append('<span class="datepicker--button-access">Применить</span>');

  const $buttonAcces = $clearButton.next();

  function onClickButtonAcces() {
    $inputFilterDate.datepicker().data('datepicker').hide();
  }

  $buttonAcces.on('mouseup', onClickButtonAcces);
});
