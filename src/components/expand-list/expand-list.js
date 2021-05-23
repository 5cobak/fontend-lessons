import ExpandList from './ExpandList';

$(document).ready(() => {
  const dropdownElements = document.querySelectorAll('.js-expand-list');

  dropdownElements.forEach((list) => new ExpandList(list));
});
