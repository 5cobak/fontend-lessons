class DateDropdown {
  constructor(inputs) {
    this._init(inputs);
  }

  _getDaysLag() {
    if (!this.$firstInput.val()) {
      this.daysLag = 0;
      if (this.callback) this.callback(this.daysLag);
      return;
    }
    const date1 = this.$firstInput
      .val()
      .split('.')
      .map((item) => Number(item));
    const date2 = this.$secondInput
      .val()
      .split('.')
      .map((item) => Number(item));

    const firstDate = new Date(date1[2], date1[1] - 1, date1[0]);
    const secondDate = new Date(date2[2], date2[1] - 1, date2[0]);

    if (Number.isNaN(secondDate.getTime())) return;

    const daysLag = Math.ceil(
      Math.abs(secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24),
    );

    this.daysLag = daysLag;
    if (this.callback) this.callback(this.daysLag);
  }

  _handlerInput(e) {
    if (e.keyCode === 9) return true;
    e.preventDefault();
    return false;
  }

  _handlerClickFirstInput() {
    this.isDatepickerActive = !this.isDatepickerActive;
    if (!this.isDatepickerActive) {
      this.$datepicker.hide();
    }
  }

  _handleClickSecondInput() {
    this.isDatepickerActive = !this.isDatepickerActive;
    this.$datepicker.show();
    if (!this.isDatepickerActive) {
      this.$datepicker.hide();
    }
  }

  _formatDate(formattedDate, input) {
    const secondDate = formattedDate.split(',')[1];
    this.formattedDate = formattedDate;
    if (!secondDate) return;
    input.val(secondDate);
  }

  _hideDatepicker() {
    this.$datepicker.hide();
  }

  _handlerSelect(formattedDate) {
    this._formatDate(formattedDate, this.$secondInput);

    this._getDaysLag();
  }

  _createDateDropdown() {
    const handlerSelect = this._handlerSelect.bind(this);
    this.$firstInput = $(this.input);
    this.$secondInput = this.$firstInput.parent().next().find('input');
    this.isDatepickerActive = false;

    this.$firstInput.datepicker({
      showEvent: 'click',
      offset: 5,
      range: true,
      onSelect: handlerSelect,
      clearButton: true,
      minDate: new Date(),
      navTitles: {
        days: 'MM yyyy',
      },
    });

    this.$datepicker = this.$firstInput.datepicker().data('datepicker');

    this.$calendarEl = this.$firstInput.datepicker().data('datepicker').$datepicker;

    this.$clearButton = this.$calendarEl.find('.datepicker--button');
    this.$buttonsParent = this.$calendarEl.find('.datepicker--buttons');
    this.$buttonsParent.append('<span class="datepicker--button-access">Применить</span>');
    this.$buttonAccess = this.$clearButton.next();
  }

  _handlerClickClearButton() {
    this.$secondInput.val('');
    this.$firstInput.val('');
    this._getDaysLag();
  }

  _handlerClickAccessButton() {
    this.isDatepickerActive = false;
    this._hideDatepicker();
  }

  _handlerClickOutside(e) {
    const { target } = e;

    const isTargetNotInput = target !== this.$firstInput && target !== this.$secondInput;
    if (isTargetNotInput) {
      this.isDatepickerActive = false;
    }
  }

  _addEvents() {
    const handlerInput = this._handlerInput.bind(this);
    const handleClickSecondInput = this._handleClickSecondInput.bind(this);
    const handlerClickClearButton = this._handlerClickClearButton.bind(this);
    const handlerClickAccessButton = this._handlerClickAccessButton.bind(this);
    const handlerClickFirstInput = this._handlerClickFirstInput.bind(this);
    const handlerClickOutside = this._handlerClickOutside.bind(this);
    this.$clearButton.on('click', handlerClickClearButton);

    this.$secondInput.on('click', handleClickSecondInput);
    this.$secondInput.on('keydown', handlerInput);
    this.$firstInput.on('keydown', handlerInput);
    this.$firstInput.on('click', handlerClickFirstInput);
    this.$buttonAccess.on('mouseup', handlerClickAccessButton);
    $(document).on('click', handlerClickOutside);
  }

  _init(input) {
    this.isShowed = false;
    this.input = input;
    this._createDateDropdown();
    this._addEvents();
  }
}

export default DateDropdown;
