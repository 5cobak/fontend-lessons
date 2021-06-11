import jQueryBridget from 'jquery-bridget';
import './cards.scss';

const Masonry = require('masonry-layout');

jQueryBridget('masonry', Masonry, $);

$(document).ready(() => {
  $('.js-cards-page__content').masonry({
    itemSelector: '.cards-page__card',
    columnWidth: '.cards-page__card',
    gutter: 40,
  });
});
