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

  _handlerBurgerClick() {
    this._toggleMenu();
  }

  _handlerShadowClick() {
    this._toggleMenu();
  }

  _bindHandlers() {
    this._handlerBurgerClick = this._handlerBurgerClick.bind(this);
    this._handlerShadowClick = this._handlerShadowClick.bind(this);
  }

  _addEvents() {
    this.burger.addEventListener('click', this._handlerBurgerClick);
    this.navShadow.addEventListener('click', this._handlerShadowClick);
  }

  _init() {
    this.burger = this.parent.querySelector('.js-header__burger');
    this.burgerLayout = this.burger.querySelector('.js-header__burger-layout');
    this.navShadow = this.parent.querySelector('.js-header__nav-shadow');
    this.nav = this.parent.querySelector('.js-header__nav');
    this._bindHandlers();
    this._addEvents();
  }
}

export default Header;
