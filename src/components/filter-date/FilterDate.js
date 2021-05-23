class FilterDate {
  constructor(elem) {
    this.$input = $(elem);
    this._init();
  }

  _hideDatePicker() {
    this.$input.datepicker().data('datepicker').hide();
  }

  _setNewFormat(datepicker) {
    this.$input.val(datepicker.customFormattedDate);
  }

  _formatDate(formattedDate) {
    let newFormat = formattedDate;

    newFormat = formattedDate.split(',').join(' - ');
    this.datepicker = this.$input.datepicker().data('datepicker');
    this.datepicker.customFormattedDate = newFormat;

    this._setNewFormat(this.datepicker);
  }

  _createDatepicker() {
    if (!this.$input) return;

    const hideDatePicker = this._hideDatePicker.bind(this);
    const setNewFormat = this._setNewFormat.bind(this);
    const formatDate = this._formatDate.bind(this);

    this.$input.datepicker({
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

    this.calendar = this.$input.datepicker().data('datepicker').$datepicker;
    this.$clearButton = this.calendar.find('.datepicker--button');
    const $buttonsParent = this.calendar.find('.datepicker--buttons');
    $buttonsParent.append('<span class="datepicker--button">Применить</span>');

    this.$buttonAccess = this.$clearButton.next();

    this.$buttonAccess.on('mouseup', hideDatePicker);
  }

  _init() {
    this._createDatepicker();
  }
}

export default FilterDate;
