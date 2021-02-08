export default class LikeButton {
  constructor($elem) {
    this.$elem = $elem;
    this.countLike = +$elem.find('.js-like-button__likes').text();
    this.init();
  }

  toggleLike() {
    const { $elem } = this;
    if (!$elem.hasClass('like-button_active')) {
      $elem.find('.js-like-button__like').css('opacity', '0');
      $elem.find('.js-like-button__like-favorite').css('opacity', '1');
      this.countLike += 1;
      $elem.find('.js-like-button__likes').text(this.countLike);
    } else {
      $elem.find('.js-like-button__like').css('opacity', '1');
      $elem.find('.js-like-button__like-favorite').css('opacity', '0');
      this.countLike -= 1;
      $elem.find('.js-like-button__likes').text(this.countLike);
    }
    $elem.toggleClass('like-button_active');
  }

  addEvents() {
    const { $elem } = this;
    const toggleLike = this.toggleLike.bind(this);

    $elem.on('click', toggleLike);
  }

  init() {
    this.addEvents();
  }
}
