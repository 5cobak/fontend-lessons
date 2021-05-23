import Swiper, { Navigation, Pagination } from 'swiper';

class CardRoom {
  constructor(elementsList) {
    this.elementsList = elementsList;
    this._init();
  }

  _createSwiper() {
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

  _init() {
    this._createSwiper();
  }
}

export default CardRoom;
