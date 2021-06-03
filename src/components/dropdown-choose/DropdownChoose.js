import declination from '../helpers/declination';

class DropdownChoose {
  constructor({
    element,
    placeholder,
    titles,
    mainDeclination,
    declinations,
    maxWidth,
    textLength,
    buttons,
  }) {
    this._init(
      element,
      placeholder,
      titles,
      mainDeclination,
      declinations,
      maxWidth,
      textLength,
      buttons,
    );
  }

  _createEl(element) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-choose js-dropdown-choose';
    dropdown.tabIndex = 0;
    dropdown.style.maxWidth = `${this.maxWidth}px`;
    element.append(dropdown);
    return dropdown;
  }

  _createUpperField() {
    const upperField = `
    <div class='dropdown-choose__upper-field js-dropdown-choose__upper-field'>
      <span class='dropdown-choose__main-text js-dropdown-choose__main-text'>${this.placeholder}</span>
      <div class='dropdown-choose__arrow js-dropdown-choose__arrow'></div>
    </div>
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', upperField);
  }

  _createMenu() {
    const menu = document.createElement('div');
    menu.className = 'dropdown-choose__menu js-dropdown-choose__menu';
    this.parentElement.append(menu);
    return menu;
  }

  _createPlusMinus() {
    this.plusMinusEl = `
    <div class='dropdown-choose__count-block js-dropdown-choose__count-block'>
      <div class='dropdown-choose__minus js-dropdown-choose__minus dropdown-choose__minus_no-active'>
        -
      </div>
      <div class='dropdown-choose__item-count js-dropdown-choose__item-count'>
        0
      </div>
      <div class='dropdown-choose__plus js-dropdown-choose__plus'>
        +
      </div>
    </div>
    `;
  }

  _createItems(items) {
    this._createPlusMinus();
    const itemsArray = items.map(
      (item) => `
      <div class='dropdown-choose__item js-dropdown-choose__item'>
        <div class='dropdown-choose__item-text js-dropdown-choose__item-text'>
          ${item}
        </div>
        ${this.plusMinusEl}
      </div>
      `,
    );
    return itemsArray.join('');
  }

  _createButtons() {
    if (!this.isButtons) return;

    this.buttons = `
      <div class='dropdown-choose__buttons js-dropdown-choose__buttons'>
        <div class='dropdown-choose__btn-clear js-dropdown-choose__btn-clear dropdown-choose__btn-clear_hidden'>Очистить</div>
        <div class='dropdown-choose__btn-access js-dropdown-choose__btn-access'>Применить</div>
      </div>
    `;
  }

  _showCurrentDropdown(e) {
    const target = e.target.closest('.js-dropdown-choose__upper-field');

    if (!target) return;
    const menu = this.parentElement.querySelector('.js-dropdown-choose__menu');
    const arrow = this.parentElement.querySelector('.js-dropdown-choose__arrow');
    const textField = target;

    this.parentElement.classList.toggle('dropdown-choose_active');
    menu.classList.toggle('dropdown-choose__menu_active');
    arrow.classList.toggle('dropdown-choose__arrow_active');
    textField.classList.toggle('dropdown-choose__upper-field_active');
  }

  _addEventsByClickOnItems() {
    const showCurrentDropdown = this._showCurrentDropdown.bind(this);
    this.parentElement.addEventListener('click', showCurrentDropdown);
  }

  _hideAllDropdowns(e) {
    const target = e.target.closest('.js-dropdown-choose');
    if (target === this.parentElement) return;

    const targetField = this.parentElement.querySelector('.js-dropdown-choose__upper-field');
    const menu = this.parentElement.querySelector('.js-dropdown-choose__menu');
    const arrow = this.parentElement.querySelector('.js-dropdown-choose__arrow');

    this.parentElement.classList.remove('dropdown-choose_active');
    menu.classList.remove('dropdown-choose__menu_active');
    arrow.classList.remove('dropdown-choose__arrow_active');
    targetField.classList.remove('dropdown-choose__upper-field_active');
  }

  _addEventsForHide() {
    const hideAll = this._hideAllDropdowns.bind(this);
    document.addEventListener('click', hideAll);
  }

  _getStringMultiVariant(items) {
    return items.map((item, index) => {
      const count = item.querySelector('.js-dropdown-choose__item-count').innerText;
      if (count === 0) {
        return null;
      } else {
        const declinedWord = `${count} ${declination(count, this.declinations[index])}`;
        return declinedWord;
      }
    });
  }

  _getLastItemVal(items) {
    const lastItem = items[items.length - 1];
    const count = lastItem.querySelector('.js-dropdown-choose__item-count').innerText;
    if (count === 0) {
      return null;
    } else {
      const declinedWord = `${count} ${declination(count, this.declinations[0])}`;
      return declinedWord;
    }
  }

  _getStringSingleVariant(items) {
    const currentItems = [
      `${this.totalCount} ${declination(this.totalCount, this.mainDeclination)}`,
    ];
    currentItems.push(this._getLastItemVal(items));
    return currentItems;
  }

  _changeText() {
    const items = this.menu.querySelectorAll('.js-dropdown-choose__item');
    const upperField = this.parentElement.querySelector('.js-dropdown-choose__upper-field');
    const upperFieldText = upperField.querySelector('.js-dropdown-choose__main-text');
    const buttonClear = this.parentElement.querySelector('.js-dropdown-choose__btn-clear');

    items.map = [].map;
    items.reduce = [].reduce;
    let currentItems = [];

    const countElements = this.menu.querySelectorAll('.js-dropdown-choose__item-count');
    countElements.map = [].map;
    countElements.reduce = [].reduce;
    const sumOfCounts = countElements
      .map((item) => Number(item.innerText))
      .reduce((acc, item) => acc + item);
    this.totalCount = sumOfCounts;
    if (this.mainDeclination) currentItems = this._getStringSingleVariant(items);
    else currentItems = this._getStringMultiVariant(items);

    if (buttonClear) {
      if (this.totalCount === 0) buttonClear.classList.add('dropdown-choose__btn-clear_hidden');
      else if (this.totalCount > 0) {
        buttonClear.classList.remove('dropdown-choose__btn-clear_hidden');
      }
    }

    let formattedItems = currentItems.filter((item) => item[0] !== '0').join(', ');

    if (formattedItems.length >= this.textLength) {
      formattedItems = `${formattedItems.slice(0, this.textLength)}...`;
    }

    upperFieldText.innerHTML = formattedItems;

    if (formattedItems.length < 1) upperFieldText.innerHTML = this.placeholder;
  }

  _handleIncrement(e) {
    const plus = e.currentTarget;
    const item = plus.parentElement;
    const countItem = item.querySelector('.js-dropdown-choose__item-count');
    const minus = item.querySelector('.js-dropdown-choose__minus');

    let count = Number(countItem.innerText);
    minus.classList.remove('dropdown-choose__minus_no-active');
    count += 1;

    countItem.innerHTML = count;
    this._changeText();
  }

  _handleDecrement(e) {
    const minus = e.currentTarget;
    const item = minus.parentElement;
    const countItem = item.querySelector('.js-dropdown-choose__item-count');
    let count = Number(countItem.innerText);
    if (count === 0) return;
    count -= 1;
    countItem.innerHTML = count;

    if (count === 0) minus.classList.add('dropdown-choose__minus_no-active');

    this._changeText();
  }

  _setEventsForPlusMinus() {
    const items = this.menu.querySelectorAll('.js-dropdown-choose__item');
    const handleIncrement = this._handleIncrement.bind(this);
    const handleDecrement = this._handleDecrement.bind(this);

    items.forEach((item) => {
      const plus = item.querySelector('.js-dropdown-choose__plus');
      const minus = item.querySelector('.js-dropdown-choose__minus');

      plus.addEventListener('click', handleIncrement);
      minus.addEventListener('click', handleDecrement);
    });
  }

  _clearUpperTextField() {
    const { menu } = this;
    const itemCounts = menu.querySelectorAll('.js-dropdown-choose__item-count');
    const mainText = this.parentElement.querySelector('.js-dropdown-choose__main-text');
    const clearBtn = menu.querySelector('.js-dropdown-choose__btn-clear');
    itemCounts.map = [].map;
    itemCounts.map((item) => {
      const newItems = item;
      newItems.innerText = 0;
      return newItems;
    });

    const minuses = menu.querySelectorAll('.js-dropdown-choose__minus');
    minuses.forEach((item) => item.classList.add('dropdown-choose__minus_no-active'));
    mainText.innerText = this.placeholder;
    clearBtn.classList.add('dropdown-choose__btn-clear_hidden');
  }

  _hideDropdownMenu() {
    const { menu } = this;
    const mainText = this.parentElement.querySelector('.js-dropdown-choose__main-text');
    const upperField = mainText.parentElement;
    const arrow = this.parentElement.querySelector('.js-dropdown-choose__arrow');

    upperField.parentElement.classList.remove('dropdown-choose_active');
    menu.classList.remove('dropdown-choose__menu_active');
    arrow.classList.remove('dropdown-choose__arrow_active');
    upperField.classList.remove('dropdown-choose__upper-field_active');
  }

  _setEventsForButtons() {
    if (!this.isButtons) return;

    const { menu } = this;

    const clearBtn = menu.querySelector('.js-dropdown-choose__btn-clear');
    const accessBtn = menu.querySelector('.js-dropdown-choose__btn-access');

    const clearUpperTextField = this._clearUpperTextField.bind(this);
    const hideDropdownMenu = this._hideDropdownMenu.bind(this);

    clearBtn.addEventListener('click', clearUpperTextField);
    accessBtn.addEventListener('click', hideDropdownMenu);
  }

  _init(
    element,
    placeholder,
    titles,
    mainDeclination,
    declinations,
    maxWidth,
    textLength,
    buttons,
  ) {
    this.placeholder = placeholder;
    this.mainDeclination = mainDeclination || null;
    this.declinations = declinations;
    this.textLength = textLength;
    this.isButtons = buttons;
    this.maxWidth = maxWidth;
    this.parentElement = this._createEl(element);
    this.totalCount = 0;
    this._createUpperField();
    this.menu = this._createMenu();
    this._addEventsByClickOnItems();
    this._addEventsForHide();
    this.items = this._createItems(titles);
    this._createButtons();
    this.menu.insertAdjacentHTML('afterbegin', [this.items, this.buttons].join(''));
    this._setEventsForPlusMinus();
    this._setEventsForButtons();
  }
}

export default DropdownChoose;
