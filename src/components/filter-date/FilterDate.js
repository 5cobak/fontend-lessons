export default class FilterDate {
  constructor(elem) {
    this.input = elem;
    this.init();
  }

  hideDatePicker() {
    this.input.datepicker().data('datepicker').hide();
  }

  setNewFormat(datepicker) {
    this.input.val(datepicker.customFormattedDate);
  }

  formatDate(formattedDate) {
    let newFormat = formattedDate;

    newFormat = formattedDate.split(',').join(' - ');
    this.datepicker = this.input.datepicker().data('datepicker');
    this.datepicker.customFormattedDate = newFormat;

    this.setNewFormat(this.datepicker);
  }

  createDatepicker() {
    const { input } = this;
    if (!this.input[0]) return;

    const hideDatePicker = this.hideDatePicker.bind(this);
    const setNewFormat = this.setNewFormat.bind(this);
    const formatDate = this.formatDate.bind(this);

    this.input.datepicker({
      showEvent: 'click',
      offset: 5,
      range: true,
      clearButton: true,
      dateFormat: 'd M',
      navTitles: {
        days: 'MM yyyy',
      },
      onSelect: formatDate,
      onHide: setNewFormat,
    });

    this.calendar = input.datepicker().data('datepicker').$datepicker;
    const $clearButton = this.calendar.find('.datepicker--button');
    const $buttonsParent = this.calendar.find('.datepicker--buttons');
    $buttonsParent.append('<span class="datepicker--button">Применить</span>');

    const $buttonAccess = $clearButton.next();

    $buttonAccess.on('mouseup', hideDatePicker);
  }

  init() {
    this.createDatepicker();
  }
}
