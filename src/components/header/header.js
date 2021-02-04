import Burger from './Burger';

$(document).ready(() => {
  const headers = document.querySelectorAll('.js-header');

  new Burger(headers);
});
