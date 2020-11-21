/* eslint-disable no-unused-vars */
import Swiper, { Navigation, Pagination } from 'swiper';

$(document).ready(() => {
  const swipersRoom = document.querySelectorAll('.js-swiper-container');

  swipersRoom.forEach((domEl) => {
    Swiper.use([Navigation, Pagination]);
    const swiper = new Swiper(domEl, {
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
});
