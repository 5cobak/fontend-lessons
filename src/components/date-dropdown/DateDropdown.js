class DateDropdown {
  constructor(dateDropdownEl) {
    this._init(dateDropdownEl);
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

  _formatDate(formattedDate, input) {
    this.formattedDate = formattedDate;
    const secondDate = formattedDate.split(',')[1];
    if (!secondDate) return;

    input.val(secondDate);
  }

  _hideDatepicker() {
    this.$datepicker.hide();
  }

  _createDateDropdown() {
    if (!this.input) return;
    const handlerSelect = this._handlerSelect.bind(this);
    this.$firstInput = $(this.input);
    this.$secondInput = this.$firstInput.parent().parent().next().find('input');
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
    this.$buttonsParent.append(
      '<button type="button" class="button button_no-bg">Применить</button>',
    );
    this.$buttonsuccess = this.$clearButton.next();
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

  _handlerSelect(formattedDate) {
    this._formatDate(formattedDate, this.$secondInput);
    const firstDate = this.formattedDate.split(',')[0];
    this.input.value = firstDate;

    this._getDaysLag();
  }

  _handlerClickClearButton() {
    this.$secondInput.val('');
    this.$firstInput.val('');
    this._getDaysLag();
  }

  _handlerClickSuccessButton(e) {
    e.stopPropagation();
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

  _handlerFocusOnInput() {
    this.$datepicker.show();
  }

  _handlerBlurInput() {
    this.$datepicker.hide();
  }

  _addEvents() {
    const handlerInput = this._handlerInput.bind(this);
    const handleClickSecondInput = this._handleClickSecondInput.bind(this);
    const handlerClickClearButton = this._handlerClickClearButton.bind(this);
    const handlerClickSuccessButton = this._handlerClickSuccessButton.bind(this);
    const handlerClickFirstInput = this._handlerClickFirstInput.bind(this);
    const handlerClickOutside = this._handlerClickOutside.bind(this);
    const handlerFocusOnInput = this._handlerFocusOnInput.bind(this);
    const handlerBlurInput = this._handlerBlurInput.bind(this);
    this.$clearButton.on('click', handlerClickClearButton);

    this.$secondInput.on('click', handleClickSecondInput);
    this.$secondInput.on('keydown', handlerInput);
    this.$secondInput.on('focus', handlerFocusOnInput);
    this.$secondInput.on('blur', handlerBlurInput);
    this.$firstInput.on('keydown', handlerInput);
    this.$firstInput.on('focus', handlerFocusOnInput);
    this.$firstInput.on('click', handlerClickFirstInput);
    this.$buttonsuccess.on('mouseup', handlerClickSuccessButton);
    $(document).on('click', handlerClickOutside);
  }

  _init(dateDropdownEl) {
    this.isShowed = false;
    this.input = dateDropdownEl.querySelector('input');
    this._createDateDropdown();
    this._addEvents();
  }
}

export default DateDropdown;
