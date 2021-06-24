class paginationSite {
  constructor($elem) {
    this.$elem = $elem;
    this._init();
  }

  _createpagination() {
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
    this._createpagination();
  }
}

export default paginationSite;
