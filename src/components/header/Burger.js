export default class Burger {
  constructor(parents) {
    this.parents = parents;
    this.init();
  }

  init() {
    this.parents.forEach((header) => {
      const burger = header.querySelector('.js-header__burger');
      const layout = header.querySelector('.js-header__burger-layout');
      const headerDropdown = header.querySelector('.js-header__nav_dropdown');
      const shadow = header.querySelector('.js-header__nav-shadow');

      function hideShowMenu() {
        $(layout).toggleClass('header__burger-layout_active');
        $(headerDropdown).toggleClass('header__nav_dropdown-active');
        $(shadow).toggleClass('header__nav-shadow_active');
        $('body').toggleClass('stop-scrolling');
      }
      $(burger).on('click', hideShowMenu);
    });
  }
}
