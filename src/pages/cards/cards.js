import jQueryBridget from 'jquery-bridget';
import '~/focus-visible/dist/focus-visible.min';
import '~/inputmask/dist/jquery.inputmask.min';

import 'components/card-room/card-room';
import 'components/date-dropdown/date-dropdown';
import 'components/dropdown-choose/dropdown-choose';
import 'components/datepicker/datepicker';

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
