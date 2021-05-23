import Burger from './Burger';

$(document).ready(() => {
  const headers = document.querySelectorAll('.js-header');

  headers.forEach((header) => new Burger(header));
});
