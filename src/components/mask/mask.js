import MaskInput from './MaskInput';

$(document).ready(() => {
  const inputs = document.querySelectorAll('.js-masked-text-field__input');

  new MaskInput(inputs);
});
