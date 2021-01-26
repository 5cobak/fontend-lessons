import DateDropdown from './DateDropdown';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-date-dropdown__input');

  const dateDropdown = new DateDropdown(inputs);
});
