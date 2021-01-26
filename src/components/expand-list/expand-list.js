import ExpandList from './ExpandList';

$(document).ready(() => {
  const dropdownElements = document.querySelectorAll('.js-expand-list');

  const expandList = new ExpandList(dropdownElements);
});
