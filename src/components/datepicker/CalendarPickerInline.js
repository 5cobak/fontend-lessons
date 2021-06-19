class CalendarPickerInline {
  constructor(els) {
    this.els = els;
    this._init();
  }

  _createCalendar() {
    this.els.forEach((item) => {
      $(item).datepicker({
        range: true,
        inline: true,
        clearButton: true,
        minDate: new Date(),
        navTitles: {
          days: 'MM yyyy',
        },
      });

      const $calendarEl = $(item).datepicker().data('datepicker').$datepicker;
      const $buttonsParent = $calendarEl.find('.datepicker--buttons');
      $buttonsParent.append('<button type="button" class="button button_no-bg">Применить</button>');
    });
  }

  _init() {
    this._createCalendar();
  }
}

export default CalendarPickerInline;
