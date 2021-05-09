export default class DateDropdown {
  constructor(inputs) {
    this.init(inputs);
    this.disableInputEvent();
  }

  disableInputEvent() {
    const handlerInput = (e) => {
      if (e.keyCode === 9) return true;
      e.preventDefault();
      return false;
    };

    const inputs = document.querySelectorAll('.js-inputDisabled');
    inputs.forEach((input) => input.addEventListener('keydown', handlerInput));
  }

  getDaysLag() {
    const date1 = this.inputs[0].value.split('.').map((item) => Number(item));
    const date2 = this.inputs[0].parentElement.nextSibling
      .querySelector('input')
      .value.split('.')
      .map((item) => Number(item));

    const firstDate = new Date(date1[2], date1[1] - 1, date1[0]);
    const secondDate = new Date(date2[2], date2[1] - 1, date2[0]);

    if (Number.isNaN(secondDate.getTime())) return;

    const daysLag = Math.ceil(Math.abs(secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24));

    this.daysLag = daysLag;
    if (this.callback) this.callback(this.daysLag);
  }

  formatDate(formattedDate, input) {
    const secondDate = formattedDate.split(',')[1];
    this.formattedDate = formattedDate;
    if (!secondDate) return;
    input.val(secondDate);
  }

  addEventsOnSelect(formattedDate, ...rest) {
    const $secondInput = $(rest[1].el.parentElement.nextSibling.querySelector('input'));
    this.formatDate(formattedDate, $secondInput);

    this.getDaysLag();
  }

  showDatepicker(e) {
    const $firstInput = $(e.target.parentElement.previousSibling.querySelector('input'));

    $firstInput.trigger('click');
  }

  clearInputVal($secondInput) {
    $secondInput.val('');
  }

  hideDatePicker($firstInput) {
    $firstInput.datepicker().data('datepicker').hide();
  }

  createDateDropdown(inputs) {
    const that = this;
    this.inputs = inputs;
    const showDatepicker = this.showDatepicker.bind(this);
    const addEventsOnSelect = this.addEventsOnSelect.bind(this);
    const clearInputVal = this.clearInputVal.bind(this);
    const hideDatePicker = this.hideDatePicker.bind(this);

    this.inputs.forEach((input) => {
      const $firstInput = $(input);
      const $secondInput = $firstInput.parent().next().find('input');

      $firstInput.datepicker({
        showEvent: 'click',
        offset: 5,
        range: true,
        onSelect: addEventsOnSelect,
        clearButton: true,
        navTitles: {
          days: 'MM<br>yyyy',
        },
      });
      that.datepicker = $firstInput.datepicker().data('datepicker');

      const $calendarEl = $firstInput.datepicker().data('datepicker').$datepicker;

      $secondInput.on('click', showDatepicker);

      const $clearButton = $calendarEl.find('.datepicker--button');
      const $buttonsParent = $calendarEl.find('.datepicker--buttons');

      $buttonsParent.append('<span class="datepicker--button">Применить</span>');
      $clearButton.on('click', clearInputVal.bind(null, $secondInput));

      const $buttonAccess = $clearButton.next();

      $buttonAccess.on('mouseup', hideDatePicker.bind(null, $firstInput));
    });
  }

  keydownHandler(e) {
    e.preventDefault();
    return false;
  }

  init(inputs) {
    this.createDateDropdown(inputs);
  }
}
