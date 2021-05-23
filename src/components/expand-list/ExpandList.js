class ExpandList {
  constructor(els) {
    this.els = els;
    this._init();
  }

  _handlerClickTitle(e) {
    const title = e.target;

    const dropdownMenu = title.parentElement.querySelector('.js-expand-list__dropdown');

    e.preventDefault();

    $(title).toggleClass('expand-list__title_active');
    $(dropdownMenu).toggleClass('expand-list__dropdown_active');
  }

  _addEvents() {
    const handlerClickTitle = this._handlerClickTitle.bind(this);
    this.els.forEach((item) => {
      const title = item.querySelector('.js-expand-list__title');
      title.addEventListener('click', handlerClickTitle);
    });
  }

  _init() {
    this._addEvents();
  }
}

export default ExpandList;
