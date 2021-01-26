import PaginationSite from './PaginationSite';

$(document).ready(() => {
  const $paginationParent = $('.pagination');

  const paginationSite = new PaginationSite($paginationParent);
});
