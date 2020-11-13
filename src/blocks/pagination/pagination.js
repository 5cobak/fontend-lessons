/* eslint-disable fsd/jq-use-js-prefix-in-selector */
$(document).ready(() => {
  $('.js-pagination').pagination({
    items: 15,
    itemsOnPage: 1,
    displayedPages: 3,
    edges: 1,
    cssStyle: 'light-theme',
    prevText: '',
    nextText: '<svg class="pagination__arrow-forward"><use xlink:href="#arrow_forward"></use></svg>',
    onPageClick: () => {
      if ($('.current').text === 1) this.prevText = '';
      else this.prevText = 'Prev';
    },
  });
});
