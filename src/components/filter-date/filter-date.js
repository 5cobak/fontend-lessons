import FilterDate from './FilterDate';

$(document).ready(() => {
  const $inputs = $('.js-filter-date__input');
  new FilterDate($inputs);
});
