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

  _handleClick() {
    this._toggleLike();
  }

  _bindhandles() {
    this.handleClick = this._handleClick.bind(this);
  }

  _addEventHandlers() {
    this.$button.on('click', this.handleClick);
  }

  _init() {
    this._bindhandles();
    this._addEventHandlers();
  }
}

export default LikeButton;
