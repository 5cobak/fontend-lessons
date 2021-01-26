export default class ExpandList {
  constructor(els) {
    this.els = els;
    this.init();
  }

  init() {
    this.els.forEach((item) => {
      const title = item.querySelector('.js-expand-list__title');
      const dropdownMenu = item.querySelector('.js-expand-list__dropdown');
      function toggleClass(e) {
        e.preventDefault();

        $(title).toggleClass('expand-list__title_active');
        $(dropdownMenu).toggleClass('expand-list__dropdown_active');
      }
      title.addEventListener('click', toggleClass);
    });
  }
}
