class PaginationSite {
  constructor($elem) {
    this.$elem = $elem;
    this._init();
  }

  _createPagination() {
    this.$elem.pagination({
      items: 15,
      itemsOnPage: 1,
      displayedPages: 3,
      edges: 1,
      cssStyle: 'light-theme',
      prevText: '',
      nextText:
        '<svg class="pagination__arrow-forward"><use xlink:href="#arrow-forward"></use></svg>',
    });
  }

  _init() {
    this._createPagination();
  }
}

export default PaginationSite;
