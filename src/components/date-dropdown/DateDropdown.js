import '~/air-datepicker/dist/js/datepicker.min';

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
    const handleSelect = this._handleSelect.bind(this);
    this.$firstInput = $(this.input);
    this.$secondInput = this.$firstInput.parent().parent().next().find('input');
    this.isDatepickerActive = false;

    this.$firstInput.datepicker({
      showEvent: 'click',
      offset: 5,
      range: true,
      onSelect: handleSelect,
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
    this.$buttonSuccess = this.$clearButton.next();
  }

  _handleInput(e) {
    if (e.keyCode === 9) return true;
    e.preventDefault();
    return false;
  }

  _handleClickFirstInput() {
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

  _handleSelect(formattedDate) {
    this._formatDate(formattedDate, this.$secondInput);
    const firstDate = this.formattedDate.split(',')[0];
    this.input.value = firstDate;

    this._getDaysLag();
  }

  _handleClickClearButton() {
    this.$secondInput.val('');
    this.$firstInput.val('');
    this._getDaysLag();
  }

  _handleClickSuccessButton(e) {
    e.stopPropagation();
    this.isDatepickerActive = false;
    this._hideDatepicker();
  }

  _handleClickOutside(e) {
    const { target } = e;

    const isTargetNotInput = target !== this.$firstInput && target !== this.$secondInput;
    if (isTargetNotInput) {
      this.isDatepickerActive = false;
    }
  }

  _handleFocusOnInput() {
    this.$datepicker.show();
  }

  _handleBlurInput() {
    this.$datepicker.hide();
  }

  _bindhandles() {
    this.handleInput = this._handleInput.bind(this);
    this.handleClickSecondInput = this._handleClickSecondInput.bind(this);
    this.handleClickClearButton = this._handleClickClearButton.bind(this);
    this.handleClickSuccessButton = this._handleClickSuccessButton.bind(this);
    this.handleClickFirstInput = this._handleClickFirstInput.bind(this);
    this.handleClickOutside = this._handleClickOutside.bind(this);
    this.handleFocusOnInput = this._handleFocusOnInput.bind(this);
    this.handleBlurInput = this._handleBlurInput.bind(this);
  }

  _addEventHandlers() {
    this.$clearButton.on('click', this.handleClickClearButton);
    this.$secondInput.on('click', this.handleClickSecondInput);
    this.$secondInput.on('keydown', this.handleInput);
    this.$secondInput.on('focus', this.handleFocusOnInput);
    this.$secondInput.on('blur', this.handleBlurInput);
    this.$firstInput.on('keydown', this.handleInput);
    this.$firstInput.on('focus', this.handleFocusOnInput);
    this.$firstInput.on('click', this.handleClickFirstInput);
    this.$buttonSuccess.on('mouseup', this.handleClickSuccessButton);
    $(document).on('click', this.handleClickOutside);
  }

  _init(dateDropdownEl) {
    this.isShowed = false;
    this.input = dateDropdownEl.querySelector('input');
    this._createDateDropdown();
    this._bindhandles();
    this._addEventHandlers();
  }
}

export default DateDropdown;
