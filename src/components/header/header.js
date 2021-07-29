class Header {
  constructor(parent) {
    this.parent = parent;
    this._init();
  }

  _toggleMenu() {
    this.burgerLayout.classList.toggle('header__burger-layout_active');
    this.burger.classList.toggle('header__burger_active');
    this.nav.classList.toggle('header__nav_active');
    this.navShadow.classList.toggle('header__nav-shadow_active');
  }

  _handleBurgerClick() {
    this._toggleMenu();
  }

  _handleShadowClick() {
    this._toggleMenu();
  }

  _bindhandles() {
    this._handleBurgerClick = this._handleBurgerClick.bind(this);
    this._handleShadowClick = this._handleShadowClick.bind(this);
  }

  _addEventHandlers() {
    this.burger.addEventListener('click', this._handleBurgerClick);
    this.navShadow.addEventListener('click', this._handleShadowClick);
  }

  _init() {
    this.burger = this.parent.querySelector('.js-header__burger');
    this.burgerLayout = this.burger.querySelector('.js-header__burger-layout');
    this.navShadow = this.parent.querySelector('.js-header__nav-shadow');
    this.nav = this.parent.querySelector('.js-header__nav');
    this._bindhandles();
    this._addEventHandlers();
  }
}

export default Header;
