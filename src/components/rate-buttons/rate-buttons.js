import RateButton from './RateButton';

$(document).ready(() => {
  const rateButtonParents = document.querySelectorAll('.js-rate-buttons');

  new RateButton(rateButtonParents);
});
