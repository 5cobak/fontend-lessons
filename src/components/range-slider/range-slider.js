import RangeSlider from './RangeSlider';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-range-slider__input');

  const rangeSlider = new RangeSlider(inputs);
});
