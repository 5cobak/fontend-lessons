$(document).ready(() => {
  const headers = document.querySelectorAll('.header');

  headers.forEach((header) => {
    const burger = header.querySelector('.js-header__burger');
    const headerDropdown = header.querySelector('.js-header__nav_dropdown');

    function hideShowMenu() {
      $(burger).toggleClass('header__burger_active');
      $(headerDropdown).toggleClass('header__nav_dropdown-active');
      $('body').toggleClass('stop-scrolling');
    }
    $(burger).on('click', hideShowMenu);
  });
});
