export default class LikeButton {
  constructor($elem) {
    this.$elem = $elem;
    this.countLike = +$elem.find('.js-like-button__likes').text();
    this.init();
  }

  addEvents() {
    const { $elem } = this;
    let count = this.countLike;

    function toggleLike() {
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

  init() {
    this.addEvents();
  }
}
