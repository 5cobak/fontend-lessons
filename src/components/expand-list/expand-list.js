import ExpandList from './ExpandList';

$(document).ready(() => {
  const dropdownElements = document.querySelectorAll('.js-expand-list');

  new ExpandList(dropdownElements);
});
