export default class DateDropdown {
  constructor(inputs) {
    this.init(inputs);
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

  createDateDropdown(inputs) {
    const that = this;
    this.inputs = inputs;

    const getDaysLag = this.getDaysLag.bind(this);

    this.inputs.forEach((input) => {
      const $firstInput = $(input);
      const $secondInput = $firstInput.parent().next().find('input');
      function formatDate(formattedDate) {
        const secondDate = formattedDate.split(',')[1];
        if (!secondDate) return;
        $secondInput.val(secondDate);
      }

      function addEventsOnSelect(formattedDate) {
        formatDate(formattedDate);
        getDaysLag();
      }

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
      function showDatepicker() {
        $firstInput.trigger('click');
      }

      $secondInput.on('click', showDatepicker);

      function clearInputVal() {
        $secondInput.val('');
      }
      const $clearButton = $calendarEl.find('.datepicker--button');
      const $buttonsParent = $calendarEl.find('.datepicker--buttons');

      $buttonsParent.append('<span class="datepicker--button-access">Применить</span>');
      $clearButton.on('click', clearInputVal);

      const $buttonAccess = $clearButton.next();

      function hideDatePicker() {
        $firstInput.datepicker().data('datepicker').hide();
      }

      $buttonAccess.on('mouseup', hideDatePicker);
    });
  }

  init(inputs) {
    this.createDateDropdown(inputs);
  }
}
