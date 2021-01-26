import Swiper, { Navigation, Pagination } from 'swiper';

export default class CardRoom {
  constructor(elemensList) {
    this.elementsList = elemensList;
    this.init();
  }

  init() {
    this.elementsList.forEach((domEl) => {
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
  }
}
