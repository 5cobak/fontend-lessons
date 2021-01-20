import PriceCalculator from './PriceCalculator';

$(document).ready(() => {
  const cards = document.querySelectorAll('.js-card-book');

  cards.forEach((card) => new PriceCalculator(card));
});
