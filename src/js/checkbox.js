$(document).ready(() => {
  $('.checkbox-wrapper__head').click((e) => {
    e.stopPropagation();
    $(this).parent().find('ul').toggleClass('checkbox-wrapper__ul_show');
    $(this).toggleClass('checkbox-wrapper__head_active');
  });
  // disabled propogation in checkbox
  $('.checkbox-wrapper__label input').click((e) => {
    e.stopPropagation();
  });

  $(document).click(() => {
    $('.checkbox-wrapper__head').parent().find('ul').removeClass('checkbox-wrapper__ul_show');
    $('.checkbox-wrapper__head').removeClass('checkbox-wrapper__head_active');
  });

  $('.checkbox-wrapper').click((e) => {
    e.stopPropagation();
  });
});
