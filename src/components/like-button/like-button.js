import LikeBbutton from './LikeButton';

$(document).ready(() => {
  const likeButtons = document.querySelectorAll('.js-like-button');

  likeButtons.forEach((item) => new LikeBbutton($(item)));
});
