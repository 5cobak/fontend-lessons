import Swiper, { Navigation, Pagination } from 'swiper';

export default class CardRoom {
  constructor(elementsList) {
    this.elementsList = elementsList;
    this.init();
  }

  createSwiper() {
    this.elementsList.forEach((domEl) => {
      Swiper.use([Navigation, Pagination]);
      new Swiper(domEl, {
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  }

  init() {
    this.createSwiper();
  }
}
