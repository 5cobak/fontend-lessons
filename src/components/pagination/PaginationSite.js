export default class PaginationSite {
  constructor($elem) {
    this.$elem = $elem;
    this.init();
  }

  init() {
    this.$elem.pagination({
      items: 15,
      itemsOnPage: 1,
      displayedPages: 3,
      edges: 1,
      cssStyle: 'light-theme',
      prevText: '',
      nextText: '<svg class="pagination__arrow-forward" role="image" aria-label="icon next page"><use xlink:href="#arrow-forward"></use></svg>',
      onPageClick: () => {
        const $current = $('.current');
        if ($current.text === 1) this.prevText = '';
        else this.prevText = 'Prev';
      },
    });
  }
}
