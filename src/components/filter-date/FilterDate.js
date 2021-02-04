export default class FilterDate {
  constructor(elem) {
    this.input = elem;
    this.init();
  }

  createDatepicker() {
    const { input } = this;
    let newFormat;
    if (!this.input[0]) return;
    function setNewFormat() {
      input.val(newFormat);
    }
    function formatDate(formattedDate) {
      newFormat = formattedDate.split(',').join(' - ');
      setNewFormat();
    }

    this.input.datepicker({
      showEvent: 'click',
      offset: 5,
      range: true,
      clearButton: true,
      dateFormat: 'd M',
      onSelect: formatDate,
      onHide: setNewFormat,
    });

    this.calendar = input.datepicker().data('datepicker').$datepicker;
    const $clearButton = this.calendar.find('.datepicker--button');
    const $buttonsParent = this.calendar.find('.datepicker--buttons');
    $buttonsParent.append('<span class="datepicker--button-access">Применить</span>');

    const $buttonAccess = $clearButton.next();

    function hideDatePicker() {
      input.datepicker().data('datepicker').hide();
    }

    $buttonAccess.on('mouseup', hideDatePicker);
  }

  init() {
    this.createDatepicker();
  }
}
