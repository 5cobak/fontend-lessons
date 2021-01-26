import CardRoom from './CardRoom';

$(document).ready(() => {
  const swipersRoom = document.querySelectorAll('.js-swiper-container');

  const cardRoom = new CardRoom(swipersRoom);
});
