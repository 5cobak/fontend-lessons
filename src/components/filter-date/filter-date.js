import FilterDate from './FilterDate';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-filter-date__input');

  inputs.forEach((input) => new FilterDate(input));
});
