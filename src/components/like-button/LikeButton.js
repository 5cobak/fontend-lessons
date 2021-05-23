class LikeButton {
  constructor(button) {
    this.$button = $(button);
    this.countLike = +this.$button.find('.js-like-button__likes').text();
    this._init();
  }

  _toggleLike() {
    const { $button } = this;
    if (!$button.hasClass('like-button_active')) {
      $button.find('.js-like-button__like').css('opacity', '0');
      $button.find('.js-like-button__like-favorite').css('opacity', '1');
      this.countLike += 1;
      $button.find('.js-like-button__likes').text(this.countLike);
    } else {
      $button.find('.js-like-button__like').css('opacity', '1');
      $button.find('.js-like-button__like-favorite').css('opacity', '0');
      this.countLike -= 1;
      $button.find('.js-like-button__likes').text(this.countLike);
    }
    $button.toggleClass('like-button_active');
  }

  _handlerClick() {
    this._toggleLike();
  }

  addEvents() {
    const handlerClick = this._handlerClick.bind(this);

    this.$button.on('click', handlerClick);
  }

  _init() {
    this.addEvents();
  }
}

export default LikeButton;
