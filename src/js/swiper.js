import jQueryBridget from 'jquery-bridget';
import Swiper from 'swiper';

jQueryBridget('swiper', Swiper, $);

$(document).ready(() => {
  // $('.swiper-container').swiper({
  //   init: true,
  //   speed: 400,
  //   spaceBetween: 0,
  //   effect: 'slide',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //   },
  //   initialSlide: 0,
  //   resistanceRatio: 0,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });
  // eslint-disable-next-line
  $('.swiper-container').each(function(){
    $(this).swiper({
      el: $(this),
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
      navigation: {
        nextEl: $(this).find('.swiper-button-next'),
        prevEl: $(this).find('.swiper-button-prev'),
      },
    });
  });
});
