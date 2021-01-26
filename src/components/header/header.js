import Burger from './Burger';

$(document).ready(() => {
  const headers = document.querySelectorAll('.js-header');

  const burger = new Burger(headers);
});
