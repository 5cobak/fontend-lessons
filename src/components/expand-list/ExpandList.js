class ExpandList {
  constructor(list) {
    this.parent = list;
    this._init();
  }

  _handlerClickTitle(e) {
    e.preventDefault();
    const title = e.target;

    title.classList.toggle('expand-list__title_active');
    this.dropdownMenu.classList.toggle('expand-list__dropdown_active');
  }

  _handlerClickOutside(e) {
    const target = e.target.closest('.js-expand-list');

    if (target !== this.parent) {
      this.title.classList.toggle('expand-list__title_active');
      this.dropdownMenu.classList.toggle('expand-list__dropdown_active');
    }
  }

  _addEvents() {
    const handlerClickTitle = this._handlerClickTitle.bind(this);
    const handlerClickOutside = this._handlerClickOutside.bind(this);
    this.title.addEventListener('click', handlerClickTitle);
    document.addEventListener('click', handlerClickOutside);
  }

  _init() {
    this.title = this.parent.querySelector('.js-expand-list__title');
    this.dropdownMenu = this.parent.querySelector('.js-expand-list__dropdown');
    this._addEvents();
  }
}

export default ExpandList;
