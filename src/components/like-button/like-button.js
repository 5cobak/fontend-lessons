/* eslint-disable no-unused-vars */
// eslint-disable-next-line
$(document).ready(() => {
  class LikeBbutton {
    constructor($elem) {
      this.$elem = $elem;
      this.countLike = +$elem.find('.js-like-button__likes').text();

      this.init();
    }

    init() {
      const $elem = this.$elem;
      let count = this.countLike;

      function toggleLike() {
        const countLike = +$elem.find('.js-like-button__likes').text();
        if (!$elem.hasClass('like-button_active')) {
          $elem.find('.js-like-button__like').css('opacity', '0');
          $elem.find('.js-like-button__like-favorite').css('opacity', '1');
          count += 1;
          $elem.find('.js-like-button__likes').text(count);
        } else {
          $elem.find('.js-like-button__like').css('opacity', '1');
          $elem.find('.js-like-button__like-favorite').css('opacity', '0');
          count -= 1;
          $elem.find('.js-like-button__likes').text(count);
        }
        $elem.toggleClass('like-button_active');
      }

      $elem.on('click', toggleLike);
    }
  }

  const likeButtons = document.querySelectorAll('.js-like-button');

  likeButtons.forEach((item) => new LikeBbutton($(item)));
});
