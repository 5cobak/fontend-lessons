$(document).ready(() => {
// eslint-disable-next-line
  $('.header__gamburger').click(function(){
    $(this).toggleClass('header__gamburger_active');
    $('.header__drop-list').toggleClass('header__drop-list_active');
  });
});
