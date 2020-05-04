import jQueryBridget from 'jquery-bridget';

const Masonry = require('masonry-layout');

jQueryBridget('masonry', Masonry, $);
$(document).ready(() => {
  $('.cards-page__wrapper').masonry({
    itemSelector: '.card',
    columnWidth: '.card',
    gutter: 40,
  });
});
