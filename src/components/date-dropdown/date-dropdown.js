import DateDropdown from './DateDropdown';

$(document).ready(() => {
  const dateDropdownCollection = document.querySelectorAll('.js-date-dropdown');

  dateDropdownCollection.forEach((input) => new DateDropdown(input));
});
