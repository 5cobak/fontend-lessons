export default class FilterDate {
  constructor(elem) {
    this.input = elem;
    this.init();
  }

  init() {
    const input = this.input;
    let newFormat;
    if (!this.input[0]) return;
    this.input.datepicker({
      showEvent: 'click',
      offset: 5,
      range: true,
      clearButton: true,
      dateFormat: 'd M',
      onSelect: (formattedDate) => {
        newFormat = formattedDate.split(',').join(' - ');
        input.val(newFormat);
      },
      onHide: () => {
        input.val(newFormat);
      },
    });

    this.calendar = input.datepicker().data('datepicker').$datepicker;
    const $clearButton = this.calendar.find('.datepicker--button');
    const $buttonsParent = this.calendar.find('.datepicker--buttons');
    $buttonsParent.append('<span class="datepicker--button-access">Применить</span>');

    const $buttonAcces = $clearButton.next();

    function onClickButtonAcces() {
      input.datepicker().data('datepicker').hide();
    }

    $buttonAcces.on('mouseup', onClickButtonAcces);
  }
}
