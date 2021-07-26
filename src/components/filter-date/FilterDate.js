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

  _handlerSelect(formattedDate) {
    this._formatDate(formattedDate);
  }

  _handlerInputClick() {
    this.isDatepickerActive = !this.isDatepickerActive;
    if (!this.isDatepickerActive) {
      this.$datepicker.hide();
    }
  }

  _handlerHide() {
    this.isDatepickerActive = false;
    if (!this.setNewFormat) return;
    this.setNewFormat();
  }

  _createDatepicker() {
    if (!this.$input) return;
    this._bindHandlers();
    const handlerHide = this._handlerHide;
    const handlerSelect = this._handlerSelect;
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
      onSelect: handlerSelect,
      onHide: handlerHide,
    });

    this.$datepicker = this.$input.datepicker().data('datepicker');
    this.calendar = this.$input.datepicker().data('datepicker').$datepicker;
    this.$clearButton = this.calendar.find('.datepicker--button');
    const $buttonsParent = this.calendar.find('.datepicker--buttons');
    $buttonsParent.append('<button class="button button_no-bg">Применить</button>');

    this.$buttonSuccess = this.$clearButton.next();
  }

  _handlerButtonSuccessMouseUp() {
    this.$datepicker.hide();
  }

  _bindHandlers() {
    this._handlerButtonSuccessMouseUp = this._handlerButtonSuccessMouseUp.bind(this);
    this._handlerInputClick = this._handlerInputClick.bind(this);
    this._handlerHide = this._handlerHide.bind(this);
    this._handlerSelect = this._handlerSelect.bind(this);
  }

  _addEvents() {
    this.$input.on('click', this._handlerInputClick);
    this.$buttonSuccess.on('mouseup', this._handlerButtonSuccessMouseUp);
  }

  _init() {
    this._createDatepicker();
    this._addEvents();
  }
}

export default FilterDate;
