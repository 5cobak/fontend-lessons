import '~/air-datepicker/dist/js/datepicker.min';

const config = {
  showEvent: 'click',
  offset: 5,
  range: true,
  clearButton: true,
  dateFormat: 'd M',
  navTitles: {
    days: 'MM yyyy',
  },
  minDate: new Date(),
};

class FilterDate {
  constructor(elem, { inputId }) {
    this.$input = $(elem);
    this._init(inputId);
  }

  _getConfig() {
    const handleHide = this._handleHide;
    const handleSelect = this._handleSelect;
    const newConfig = { ...config, onSelect: handleSelect, onHide: handleHide };
    return newConfig;
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
      this.$datepickerInstance.hide();
    }
  }

  _handleHide() {
    this.isDatepickerActive = false;
    if (!this.setNewFormat) return;
    this.setNewFormat();
  }

  _findButton() {
    this.$clearButton = this.calendar.find('.datepicker--button');
    this.$buttonsParent = this.calendar.find('.datepicker--buttons');
  }

  _appendButtonSuccess() {
    this.$buttonsParent.append('<button class="button button_no-bg">Применить</button>');
  }

  _findButtonSuccess() {
    this.$buttonSuccess = this.$clearButton.next();
  }

  _createDatepicker(datepickerConfig) {
    this.isDatepickerActive = false;

    this.$datepickerInstance = this.$input.datepicker(datepickerConfig).data('datepicker');

    this.calendar = this.$datepickerInstance.$datepicker;
  }

  _setAttr() {
    this.$input.attr('id', this.inputId);
  }

  _handleButtonSuccessMouseUp() {
    this.$datepickerInstance.hide();
  }

  _bindHandlers() {
    this._handleButtonSuccessMouseUp = this._handleButtonSuccessMouseUp.bind(this);
    this._handleInputClick = this._handleInputClick.bind(this);
    this._handleHide = this._handleHide.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
  }

  _addEventHandlers() {
    this.$input.on('click', this._handleInputClick);
    this.$buttonSuccess.on('mouseup', this._handleButtonSuccessMouseUp);
  }

  _init(inputId) {
    this.inputId = inputId;
    this._bindHandlers();
    this.config = this._getConfig();
    this._createDatepicker(this.config);
    this._findButton();
    this._appendButtonSuccess();
    this._findButtonSuccess();
    this._addEventHandlers();
    this._setAttr();
  }
}

export default FilterDate;
