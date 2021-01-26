import FilterDate from './FilterDate';

$(document).ready(() => {
  const $inputs = $('.js-filter-date__input');
  const filterDate = new FilterDate($inputs);
});
