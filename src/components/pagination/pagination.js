import PaginationSite from './PaginationSite';

$(document).ready(() => {
  const $paginationParent = $('.js-pagination__container');

  new PaginationSite($paginationParent);
});
