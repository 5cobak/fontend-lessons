import CalendarPickerInline from './CalendarPickerInline';

$(document).ready(() => {
  const inlineDatepickerParents = document.querySelectorAll('.js-datepicker-inline');

  const inlinePicker = new CalendarPickerInline(inlineDatepickerParents);
});
