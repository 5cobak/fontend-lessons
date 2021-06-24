import Swiper from 'swiper/bundle';
import declination from '../helpers/declination';

class CardRoom {
  constructor(cardRoomEl) {
    this.cardRoomEl = cardRoomEl;
    this._init();
  }

  _createSwiper() {
    new Swiper(this.carousel, {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  _declineReviewText() {
    const declinedText = declination(this.reviewsNum, ['Отзыв', 'Отзыва', 'Отзывов']);

    this.reviewsText.innerHTML = `${declinedText}`;
  }

  _init() {
    this.carousel = this.cardRoomEl.querySelector('.js-swiper-container');
    this.reviewsText = this.cardRoomEl.querySelector('.js-card-room__reviews-text');
    this.reviewsNum = this.cardRoomEl.querySelector('.js-card-room__reviews-num').innerHTML;
    this._createSwiper();
    this._declineReviewText();
  }
}

export default CardRoom;
