import PaginationSite from './PaginationSite';

$(document).ready(() => {
  const $paginationParent = $('.pagination');

  new PaginationSite($paginationParent);
});
