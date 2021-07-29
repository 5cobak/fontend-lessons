import '~/air-datepicker/dist/js/datepicker.min';

class FilterDate {
  constructor(elem) {
    this.$input = $(elem);
    this._init();
  }

  _hideDatePicker() {
    this.$input.datepicker().data('datepicker').hide();
  }

  _setNewFormat() {
    this.$input.val(this.customFormattedDate);
  }

  _formatDate(formattedDate) {
    this.customFormattedDate = formattedDate.split(',').join(' - ');

    this._setNewFormat();
  }

  _handleSelect(formattedDate) {
    this._formatDate(formattedDate);
  }

  _handleInputClick() {
    this.isDatepickerActive = !this.isDatepickerActive;
    if (!this.isDatepickerActive) {
      this.$datepicker.hide();
    }
  }

  _handleHide() {
    this.isDatepickerActive = false;
    if (!this.setNewFormat) return;
    this.setNewFormat();
  }

  _createDatepicker() {
    if (!this.$input) return;
    this._bindhandles();
    const handleHide = this._handleHide;
    const handleSelect = this._handleSelect;
    this.isDatepickerActive = false;

    this.$input.datepicker({
      showEvent: 'click',
      offset: 5,
      range: true,
      clearButton: true,
      dateFormat: 'd M',
      navTitles: {
        days: 'MM yyyy',
      },
      minDate: new Date(),
      onSelect: handleSelect,
      onHide: handleHide,
    });

    this.$datepicker = this.$input.datepicker().data('datepicker');
    this.calendar = this.$input.datepicker().data('datepicker').$datepicker;
    this.$clearButton = this.calendar.find('.datepicker--button');
    const $buttonsParent = this.calendar.find('.datepicker--buttons');
    $buttonsParent.append('<button class="button button_no-bg">Применить</button>');

    this.$buttonSuccess = this.$clearButton.next();
  }

  _handleButtonSuccessMouseUp() {
    this.$datepicker.hide();
  }

  _bindhandles() {
    this._handleButtonSuccessMouseUp = this._handleButtonSuccessMouseUp.bind(this);
    this._handleInputClick = this._handleInputClick.bind(this);
    this._handleHide = this._handleHide.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
  }

  _addEventHandlers() {
    this.$input.on('click', this._handleInputClick);
    this.$buttonSuccess.on('mouseup', this._handleButtonSuccessMouseUp);
  }

  _init() {
    this._createDatepicker();
    this._addEventHandlers();
  }
}

export default FilterDate;
