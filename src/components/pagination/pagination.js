import PaginationSite from './paginationSite';

$(document).ready(() => {
  const $paginationParent = $('.js-pagination__container');

  new PaginationSite($paginationParent);
});
