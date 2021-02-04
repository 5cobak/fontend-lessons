import DateDropdown from './DateDropdown';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-date-dropdown__input');

  new DateDropdown(inputs);
});
