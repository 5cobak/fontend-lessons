import CalendarPickerInline from './CalendarPickerInline';

$(document).ready(() => {
  const inlineDatepickerParents = document.querySelectorAll('.js-datepicker-inline');

  new CalendarPickerInline(inlineDatepickerParents);
});
