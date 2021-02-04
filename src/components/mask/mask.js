import MaskInput from './MaskInput';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-date-masked');

  new MaskInput(inputs);
});
