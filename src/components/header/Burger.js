export default class Burger {
  constructor(parents) {
    this.parents = parents;
    this.init();
  }

  hideShowMenu(e) {
    const burger = e.target.closest('.js-header__burger');

    const layout = burger.querySelector('.js-header__burger-layout');
    const headerDropdown = burger.closest('.js-header').querySelector('.js-header__nav_dropdown');
    const shadow = burger.closest('.js-header').querySelector('.js-header__nav-shadow');
    $(layout).toggleClass('header__burger-layout_active');
    $(headerDropdown).toggleClass('header__nav_dropdown-active');
    $(shadow).toggleClass('header__nav-shadow_active');
    $('body').toggleClass('stop-scrolling');
  }

  addEvents() {
    const hideShowMenu = this.hideShowMenu.bind(this);
    this.parents.forEach((header) => {
      const burger = header.querySelector('.js-header__burger');
      $(burger).on('click', hideShowMenu);
    });
  }

  init() {
    this.addEvents();
  }
}
