import CardRoom from './CardRoom';

$(document).ready(() => {
  const swipersRoom = document.querySelectorAll('.js-swiper-container');

  new CardRoom(swipersRoom);
});
