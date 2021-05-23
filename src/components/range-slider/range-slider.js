import RangeSlider from './RangeSlider';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-range-slider__input');

  inputs.forEach((input) => new RangeSlider(input));
});
