$(document).ready(() => {
  const dropdownElements = document.querySelectorAll('.js-expand-list');

  dropdownElements.forEach((item) => {
    const title = item.querySelector('.expand-list__title');
    const dropdownMenu = item.querySelector('.expand-list__dropdown');
    function toggleClass(e) {
      e.preventDefault();

      $(title).toggleClass('expand-list__title_active');
      $(dropdownMenu).toggleClass('expand-list__dropdown_active');
    }
    title.addEventListener('click', toggleClass);

    const checkboxes = item.querySelectorAll('.expand-list__checkbox');

    function stopBubble(e) {}
    checkboxes.forEach((item) => item.addEventListener('click', stopBubble));
  });
});
