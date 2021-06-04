import CardRoom from './CardRoom';

$(document).ready(() => {
  const cardRoomEls = document.querySelectorAll('.js-card-room');

  cardRoomEls.forEach((cardRoomEl) => new CardRoom(cardRoomEl));
});
