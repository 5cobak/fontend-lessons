class LikeButton {
  constructor(button) {
    this.$button = $(button);
    this.countLike = +this.$button.find('.js-like-button__likes').text();
    this._init();
  }

  _toggleLike() {
    const { $button } = this;
    if (!$button.hasClass('like-button_active')) {
      this.countLike += 1;
      $button.find('.js-like-button__likes').text(this.countLike);
    } else {
      this.countLike -= 1;
      $button.find('.js-like-button__likes').text(this.countLike);
    }
    $button.toggleClass('like-button_active');
  }

  _handlerClick() {
    this._toggleLike();
  }

  _bindHandlers() {
    this.handlerClick = this._handlerClick.bind(this);
  }

  _addEventHandlers() {
    this.$button.on('click', this.handlerClick);
  }

  _init() {
    this._bindHandlers();
    this._addEventHandlers();
  }
}

export default LikeButton;
