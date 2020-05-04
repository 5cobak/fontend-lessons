$(document).ready(() => {
  let currentStar;
  let arrayStar = [];
  const star = '<svg class="rate__star"><use xlink:href="#star"></use></svg>';
  const starFull = '<svg class="rate__star rate__star_full"><use xlink:href="#star-full"></use></svg>';

  $('.rate__star-wrap').click(() => {
    if ($(this).find('input').attr('disabled')) {
      return;
    }

    $(this).toggleClass('rate__star-wrap_rated');
    if ($(this).hasClass('rate__star-wrap_rated')) {
      $(this).find('input').attr('checked', 'true');
      currentStar = $(this).find('.rate__rating').val();
      arrayStar = $(this).parent().find('.rate__star');

      $.each(arrayStar, (index, value) => {
        if (index < currentStar) {
          $(value).replaceWith(starFull);
        } else $(value).replaceWith(star);
      });
    } else {
      $(this).find('input').attr('checked', 'true');
      currentStar = $(this).find('.rate__rating').val();
      arrayStar = $(this).parent().find('.rate__star');
    }
  });
});
