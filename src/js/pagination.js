
$(document).ready(() => {
  // eslint-disable-next-line
  // $('.section-search__catalog').each(function(index) {
  //   $(this).attr('data-number', index);
  //   // $(this).addClass('section-search__catalog_active');
  //   console.log($(this));
  // });

  $('.pagination').pagination({
    items: 15,
    itemsOnPage: 1,
    displayedPages: 3,
    edges: 1,
    cssStyle: 'light-theme',
    prevText: '',
    nextText: '<svg class="arrow-forward"><use xlink:href="#arrow_forward"></use></svg>',
    onPageClick: () => {
      if ($('.current').text === 1) this.prevText = '';
      else this.prevText = 'Prev';
      // $('.section-search__catalog').removeClass('section-search__catalog_active');
      // // eslint-disable-next-line
      // $('.section-search__catalog').each(function(index, value) {
      //   if (+$('.current').text() === index) {
      //     $(this).addClass('section-search__catalog_active');
      //   }
      // });
    },
  });
});
