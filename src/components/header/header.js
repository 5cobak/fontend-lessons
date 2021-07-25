class Header {
  constructor(parent) {
    this.parent = parent;
    this._init();
  }

  _toggleMenu() {
    this.burgerLayout.classList.toggle('header__burger-layout_active');
    this.burger.classList.toggle('header__burger_active');
    this.menu.classList.toggle('header__nav_active');
    this.shadow.classList.toggle('header__nav-shadow_active');
  }

  _handlerClickBurger(e) {
    this._toggleMenu(e);
  }

  _handlerClickOnShadow() {
    this._toggleMenu();
  }

  _bindHandlers() {
    this.handlerClickBurger = this._handlerClickBurger.bind(this);
    this.handlerClickOnShadow = this._handlerClickOnShadow.bind(this);
  }

  _addEvents() {
    this.burger.addEventListener('click', this.handlerClickBurger);
    this.shadow.addEventListener('click', this.handlerClickOnShadow);
  }

  _init() {
    this.burger = this.parent.querySelector('.js-header__burger');
    this.burgerLayout = this.burger.querySelector('.js-header__burger-layout');
    this.shadow = this.parent.querySelector('.js-header__nav-shadow');
    this.menu = this.parent.querySelector('.js-header__nav');
    this._bindHandlers();
    this._addEvents();
  }
}

export default Header;
