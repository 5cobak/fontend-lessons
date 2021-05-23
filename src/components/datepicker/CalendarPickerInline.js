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
      $buttonsParent.append('<span class="datepicker--button">Применить</span>');
    });
  }

  _init() {
    this._createCalendar();
  }
}

export default CalendarPickerInline;
