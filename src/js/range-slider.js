$(document).ready(() => {
  const price = $('.range').children('.range__price');

  function showPrice(data) {
    price.find('.range__from').html(`${data.from}₽`);
    price.find('.range__to').html(`${data.to}₽`);
  }


  $('#example_id').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 15000,
    from: 5000,
    to: 10000,
    skin: 'round',
    decorate_both: false,
    prettify_enabled: false,
    hide_min_max: true,
    onStart: showPrice,
    onChange: showPrice,
    onFinish: showPrice,
    onUpdate: showPrice,
  });
});
