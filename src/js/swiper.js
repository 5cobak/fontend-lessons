import jQueryBridget from 'jquery-bridget';
import Swiper from 'swiper';

jQueryBridget('swiper', Swiper, $);

$(document).ready(() => {
  $('.swiper-container').swiper({
    init: true,
    speed: 400,
    spaceBetween: 0,
    effect: 'slide',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    initialSlide: 0,
    resistanceRatio: 0,
  });
});
