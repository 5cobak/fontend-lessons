import DateDropdown from './DateDropdown';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-date-dropdown__input');

  inputs.forEach((input) => new DateDropdown(input));
});
