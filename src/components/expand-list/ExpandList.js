class ExpandList {
  constructor(els) {
    this.els = els;
    this.init();
  }

  showHide(e) {
    const title = e.target;

    const dropdownMenu = title.parentElement.querySelector('.js-expand-list__dropdown');

    e.preventDefault();

    $(title).toggleClass('expand-list__title_active');
    $(dropdownMenu).toggleClass('expand-list__dropdown_active');
  }

  addEvents() {
    const showHide = this.showHide.bind(this);
    this.els.forEach((item) => {
      const title = item.querySelector('.js-expand-list__title');
      title.addEventListener('click', showHide);
    });
  }

  init() {
    this.addEvents();
  }
}

export default ExpandList;
