import LikeButton from './LikeButton';

$(document).ready(() => {
  const likeButtons = document.querySelectorAll('.js-like-button');

  likeButtons.forEach((item) => new LikeButton($(item)));
});
