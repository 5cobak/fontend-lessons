// eslint-disable-next-line
$('.like-button').on('click', function () {
  let countLike = +$(this).find('.js-like-button__likes').text();
  if (!$(this).hasClass('like-button_active')) {
    $(this).find('.js-like-button__like').css('opacity', '0');
    $(this).find('.js-like-button__like-favorite').css('opacity', '1');
    countLike += 1;
    $(this).find('.js-like-button__likes').text(countLike);
  } else {
    $(this).find('.js-like-button__like').css('opacity', '1');
    $(this).find('.js-like-button__like-favorite').css('opacity', '0');
    countLike -= 1;
    $(this).find('.js-like-button__likes').text(countLike);
  }
  $(this).toggleClass('like-button_active');
});
