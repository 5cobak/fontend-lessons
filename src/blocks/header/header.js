$(document).ready(() => {
  const headers = document.querySelectorAll('.header');

  headers.forEach((header) => {
    const burger = header.querySelector('.js-header__burger');
    const headerDropdown = header.querySelector('.js-header__nav_dropdown');
    const shadow = header.querySelector('.js-header__nav-shadow');

    function hideShowMenu() {
      $(burger).toggleClass('header__burger_active');
      $(headerDropdown).toggleClass('header__nav_dropdown-active');
      $(shadow).toggleClass('header__nav-shadow_active');
      $('body').toggleClass('stop-scrolling');
    }
    $(burger).on('click', hideShowMenu);
  });
});
