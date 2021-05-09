class CalendarPickerInline {
  constructor(els) {
    this.els = els;
    this.init();
  }

  createCalendar() {
    this.els.forEach((item) => {
      $(item).datepicker({
        range: true,
        inline: true,
        clearButton: true,
        navTitles: {
          days: 'MM yyyy',
        },
      });

      const $calendarEl = $(item).datepicker().data('datepicker').$datepicker;
      const $buttonsParent = $calendarEl.find('.datepicker--buttons');
      $buttonsParent.append('<span class="datepicker--button">Применить</span>');
    });
  }

  init() {
    this.createCalendar();
  }
}

export default CalendarPickerInline;
