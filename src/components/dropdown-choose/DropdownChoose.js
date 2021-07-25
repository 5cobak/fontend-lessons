import declination from '../helpers/declination';

class DropdownChoose {
  constructor({
    element,
    placeholder,
    titles,
    inputName,
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
      inputName,
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
    dropdown.style.maxWidth = `${this.maxWidth}px`;
    element.append(dropdown);
    return dropdown;
  }

  _createUpperField() {
    const upperField = `
    <div class='dropdown-choose__upper-field-wrap js-dropdown-choose__upper-field-wrap'>
      <input name=${this.inputName} class='dropdown-choose__upper-field js-dropdown-choose__upper-field' value='${this.placeholder}'/>
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
      <button type='button' class='dropdown-choose__minus js-dropdown-choose__minus dropdown-choose__minus_not-active'>
        -
      </button>
      <div class='dropdown-choose__item-count js-dropdown-choose__item-count'>
        0
      </div>
      <button type='button' class='dropdown-choose__plus js-dropdown-choose__plus'>
        +
      </button>
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
        <button type='button' class='button button_no-bg button_hidden'>Очистить</button>
        <button type='button' class='button button_no-bg'>Применить</button>
      </div>
    `;
  }

  _handlerClickDropdown(e) {
    const { target } = e;
    const isClickOnUpperField = target !== this.input && target !== this.arrow;
    if (isClickOnUpperField) return;

    this.parentElement.classList.toggle('dropdown-choose_active');
  }

  _addEventsOnClickDropdown() {
    const handlerClickDropdown = this._handlerClickDropdown.bind(this);
    this.parentElement.addEventListener('click', handlerClickDropdown);
  }

  _handlerFocusOnUpperField(e) {
    if (e.key !== 'Tab') return;
    this.parentElement.classList.toggle('dropdown-choose_active');
  }

  _addEventsOnInput() {
    this.input.addEventListener('keydown', this._handlerFocusOnUpperField);
  }

  _handlerClickOutSide(e) {
    const target = e.target.closest('.js-dropdown-choose');
    if (target === this.parentElement) return;

    this.parentElement.classList.remove('dropdown-choose_active');
  }

  _addEventsForHide() {
    document.addEventListener('click', this.handlerClickOutSide);
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

    if (this.buttonClear) {
      if (this.totalCount === 0) this.buttonClear.classList.add('button_hidden');
      else if (this.totalCount > 0) {
        this.buttonClear.classList.remove('button_hidden');
      }
    }

    let formattedItems = currentItems.filter((item) => item[0] !== '0').join(', ');

    if (formattedItems.length >= this.textLength) {
      formattedItems = `${formattedItems.slice(0, this.textLength)}...`;
    }

    upperField.value = formattedItems;

    if (formattedItems.length < 1) upperField.value = this.placeholder;
  }

  _handlerIncrement(e) {
    const plus = e.currentTarget;
    const item = plus.parentElement;
    const countItem = item.querySelector('.js-dropdown-choose__item-count');
    const minus = item.querySelector('.js-dropdown-choose__minus');

    let count = Number(countItem.innerText);
    minus.classList.remove('dropdown-choose__minus_not-active');
    count += 1;

    countItem.innerHTML = count;
    this._changeText();
  }

  _handlerDecrement(e) {
    const minus = e.currentTarget;
    const item = minus.parentElement;
    const countItem = item.querySelector('.js-dropdown-choose__item-count');
    let count = Number(countItem.innerText);
    if (count === 0) return;
    count -= 1;
    countItem.innerHTML = count;

    if (count === 0) minus.classList.add('dropdown-choose__minus_not-active');

    this._changeText();
  }

  _setEventsForPlusMinus() {
    const items = this.menu.querySelectorAll('.js-dropdown-choose__item');

    items.forEach((item) => {
      const plus = item.querySelector('.js-dropdown-choose__plus');
      const minus = item.querySelector('.js-dropdown-choose__minus');

      plus.addEventListener('click', this.handlerIncrement);
      minus.addEventListener('click', this.handlerDecrement);
    });
  }

  _handlerClickButtonClear() {
    const { menu } = this;
    const itemCounts = menu.querySelectorAll('.js-dropdown-choose__item-count');
    const upperField = this.parentElement.querySelector('.js-dropdown-choose__upper-field');
    itemCounts.map = [].map;
    itemCounts.map((item) => {
      const newItems = item;
      newItems.innerText = 0;
      return newItems;
    });

    const minuses = menu.querySelectorAll('.js-dropdown-choose__minus');
    minuses.forEach((item) => item.classList.add('dropdown-choose__minus_not-active'));
    upperField.value = this.placeholder;
    this.buttonClear.classList.add('button_hidden');
  }

  _handlerBlur() {
    this.parentElement.classList.remove('dropdown-choose_active');
  }

  _handlerClickSuccessButton() {
    this.parentElement.classList.remove('dropdown-choose_active');
  }

  _setEventsForButtons() {
    if (!this.isButtons) return;

    this.buttonClear.addEventListener('click', this.handlerClickButtonClear);
    this.buttonSuccess.addEventListener('click', this.handlerClickSuccessButton);
    this.buttonSuccess.addEventListener('blur', this.handlerBlur);
  }

  _bindHandlers() {
    this.handlerClickButtonClear = this._handlerClickButtonClear.bind(this);
    this.handlerBlur = this._handlerBlur.bind(this);
    this.handlerClickSuccessButton = this._handlerClickSuccessButton.bind(this);
    this.handlerIncrement = this._handlerIncrement.bind(this);
    this.handlerDecrement = this._handlerDecrement.bind(this);
    this.handlerClickOutSide = this._handlerClickOutSide.bind(this);
    this._handlerFocusOnUpperField = this._handlerFocusOnUpperField.bind(this);
  }

  _init(
    element,
    placeholder,
    titles,
    inputName,
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
    this.inputName = inputName;
    this.isButtons = buttons;
    this.maxWidth = maxWidth;
    this.parentElement = this._createEl(element);
    this.totalCount = 0;
    this._createUpperField();
    this.input = this.parentElement.querySelector('.js-dropdown-choose__upper-field');
    this.arrow = this.parentElement.querySelector('.js-dropdown-choose__arrow');
    this.menu = this._createMenu();
    this._addEventsOnInput();
    this._addEventsOnClickDropdown();
    this._addEventsForHide();
    this.items = this._createItems(titles);
    this._createButtons();
    this.menu.insertAdjacentHTML('afterbegin', [this.items, this.buttons].join(''));
    if (this.buttons) {
      this.basementButtons = this.parentElement.querySelector('.js-dropdown-choose__buttons');
      const [buttonClear, buttonSuccess] = Array.from(this.basementButtons.children);
      this.buttonClear = buttonClear;
      this.buttonSuccess = buttonSuccess;
    }

    this._setEventsForPlusMinus();
    this._setEventsForButtons();
  }
}

export default DropdownChoose;
