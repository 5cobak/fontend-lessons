import declination from '../helpers/declination';

class DropdownChoose {
  constructor({ element, placeholder, titles, mainDeclination, declinations, maxWidth, textLength, buttons }) {
    this.init(element, placeholder, titles, mainDeclination, declinations, maxWidth, textLength, buttons);
  }

  createEl(element) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-choose';
    dropdown.tabIndex = 0;
    dropdown.style.maxWidth = `${this.maxWidth}px`;
    element.append(dropdown);
    return dropdown;
  }

  createUpperField() {
    const upperField = `
    <div class='dropdown-choose__upper-field'>
      <span class='dropdown-choose__main-text'>${this.placeholder}</span>
      <div class='dropdown-choose__arrow'></div>
    </div>
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', upperField);
  }

  createMenu() {
    const menu = document.createElement('div');
    menu.className = 'dropdown-choose__menu';
    this.parentElement.append(menu);
    return menu;
  }

  createPlusMinus() {
    this.plusMinusEl = `
    <div class='dropdown-choose__count-block'>
      <div class='dropdown-choose__minus dropdown-choose__minus_no-active'>
        -
      </div>
      <div class='dropdown-choose__item-count'>
        0
      </div>
      <div class='dropdown-choose__plus'>
        +
      </div>
    </div>
    `;
  }

  createItems(items) {
    this.createPlusMinus();
    const itemsArray = items.map(
      (item) => `
      <div class='dropdown-choose__item'>
        <div class='dropdown-choose__item-text'>
          ${item}
        </div>
        ${this.plusMinusEl}
      </div>
      `
    );
    return itemsArray.join('');
  }

  createButtons() {
    if (!this.isButtons) return;

    this.buttons = `
      <div class='dropdown-choose__buttons'>
        <div class='dropdown-choose__btn-clear dropdown-choose__btn-clear_hidden'>Отчистить</div>
        <div class='dropdown-choose__btn-access'>Применить</div>
      </div>
    `;
  }

  showCurrentDropdown(e) {
    const targetField = e.target.closest('.dropdown-choose__upper-field');

    if (!targetField) return;
    const menu = this.parentElement.querySelector('.dropdown-choose__menu');
    const arrow = this.parentElement.querySelector('.dropdown-choose__arrow');

    this.parentElement.classList.add('dropdown-choose_active');
    menu.classList.add('dropdown-choose__menu_active');
    arrow.classList.add('dropdown-choose__arrow_active');
    targetField.classList.add('dropdown-choose__upper-field_active');
  }

  addEventsByClickOnItems() {
    const showCurrentDropdown = this.showCurrentDropdown.bind(this);
    this.parentElement.addEventListener('click', showCurrentDropdown);
  }

  hideAllDropdowns(e) {
    const target = e.target.closest('.dropdown-choose');

    if (target === this.parentElement) return;

    const targetField = this.parentElement.querySelector('.dropdown-choose__upper-field');
    const menu = this.parentElement.querySelector('.dropdown-choose__menu');
    const arrow = this.parentElement.querySelector('.dropdown-choose__arrow');

    this.parentElement.classList.remove('dropdown-choose_active');
    menu.classList.remove('dropdown-choose__menu_active');
    arrow.classList.remove('dropdown-choose__arrow_active');
    targetField.classList.remove('dropdown-choose__upper-field_active');
  }

  addEventsForHide() {
    const hideAll = this.hideAllDropdowns.bind(this);
    document.addEventListener('click', hideAll);
  }

  getStringMultiVariant(items) {
    return items.map((item, index) => {
      const count = item.querySelector('.dropdown-choose__item-count').innerText;
      if (count === 0) {
        return null;
      } else {
        const declinedWord = `${count} ${declination(count, this.declinations[index])}`;
        return declinedWord;
      }
    });
  }

  getLastItemVal(items) {
    const lastItem = items[items.length - 1];
    const count = lastItem.querySelector('.dropdown-choose__item-count').innerText;
    if (count === 0) {
      return null;
    } else {
      const declinedWord = `${count} ${declination(count, this.declinations[0])}`;
      return declinedWord;
    }
  }

  getStringSingleVariant(items) {
    const currentItems = [`${this.totalCount} ${declination(this.totalCount, this.mainDeclination)}`];
    currentItems.push(this.getLastItemVal(items));
    return currentItems;
  }

  changeText() {
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    const upperField = this.parentElement.querySelector('.dropdown-choose__upper-field');
    const upperFieldText = upperField.querySelector('.dropdown-choose__main-text');
    const buttonClear = this.parentElement.querySelector('.dropdown-choose__btn-clear');

    items.map = [].map;
    items.reduce = [].reduce;
    let currentItems = [];

    const countElements = this.menu.querySelectorAll('.dropdown-choose__item-count');
    countElements.map = [].map;
    countElements.reduce = [].reduce;
    const sumOfCounts = countElements.map((item) => Number(item.innerText)).reduce((acc, item) => acc + item);
    this.totalCount = sumOfCounts;
    if (this.mainDeclination) currentItems = this.getStringSingleVariant(items);
    else currentItems = this.getStringMultiVariant(items);

    if (buttonClear) {
      if (this.totalCount === 0) buttonClear.classList.add('dropdown-choose__btn-clear_hidden');
      else if (this.totalCount > 0) buttonClear.classList.add('dropdown-choose__btn-clear_hidden');
    }

    let formattedItems = currentItems.filter((item) => item[0] !== '0').join(',');

    if (formattedItems.length >= this.textLength) {
      formattedItems = `${formattedItems.slice(0, this.textLength)}...`;
    }

    upperFieldText.innerHTML = formattedItems;

    if (formattedItems.length < 1) upperFieldText.innerHTML = this.placeholder;
  }

  handleIncrement(e) {
    const plus = e.currentTarget;
    const item = plus.parentElement;
    const countItem = item.querySelector('.dropdown-choose__item-count');
    const minus = item.querySelector('.dropdown-choose__minus');

    let count = Number(countItem.innerText);
    minus.classList.remove('dropdown-choose__minus_no-active');
    count += 1;

    countItem.innerHTML = count;
    this.changeText();
  }

  handleDecrement(e) {
    const minus = e.currentTarget;
    const item = minus.parentElement;
    const countItem = item.querySelector('.dropdown-choose__item-count');
    let count = Number(countItem.innerText);
    if (count === 0) return;
    count -= 1;
    countItem.innerHTML = count;

    if (count === 0) $(minus).addClass('dropdown-choose__minus_no-active');

    this.changeText();
  }

  setEventsForPlusMinus() {
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    const handleIncrement = this.handleIncrement.bind(this);
    const handleDecrement = this.handleDecrement.bind(this);

    items.forEach((item) => {
      const plus = item.querySelector('.dropdown-choose__plus');
      const minus = item.querySelector('.dropdown-choose__minus');

      plus.addEventListener('click', handleIncrement);
      minus.addEventListener('click', handleDecrement);
    });
  }

  clearUpperTextField() {
    const { menu } = this;
    const itemCounts = menu.querySelectorAll('.dropdown-choose__item-count');
    const mainText = this.parentElement.querySelector('.dropdown-choose__main-text');
    const clearBtn = menu.querySelector('.dropdown-choose__btn-clear');
    itemCounts.map = [].map;
    itemCounts.map((item) => {
      const newItems = item;
      newItems.innerText = 0;
      return newItems;
    });

    const minuses = menu.querySelectorAll('.dropdown-choose__minus');
    minuses.forEach((item) => item.classList.add('dropdown-choose__minus_no-active'));
    mainText.innerText = this.placeholder;
    $(clearBtn).addClass('dropdown-choose__btn-clear_hidden');
  }

  hideDropdownMenu() {
    const { menu } = this;
    const mainText = this.parentElement.querySelector('.dropdown-choose__main-text');
    const upperField = mainText.parentElement;
    const arrow = this.parentElement.querySelector('.dropdown-choose__arrow');
    upperField.parentElement.classList.remove('dropdown-choose_active');
    menu.classList.remove('dropdown-choose__menu_active');
    arrow.classList.remove('dropdown-choose__arrow_active');
    upperField.classList.remove('dropdown-choose__upper-field_active');
  }

  setEventsForButtons() {
    if (!this.isButtons) return;

    const { menu } = this;

    const clearBtn = menu.querySelector('.dropdown-choose__btn-clear');
    const accessBtn = menu.querySelector('.dropdown-choose__btn-access');

    const clearUpperTextField = this.clearUpperTextField.bind(this);
    const hideDropdownMenu = this.hideDropdownMenu.bind(this);

    clearBtn.addEventListener('click', clearUpperTextField);
    accessBtn.addEventListener('click', hideDropdownMenu);
  }

  init(element, placeholder, titles, mainDeclination, declinations, maxWidth, textLength, buttons) {
    this.placeholder = placeholder;
    this.mainDeclination = mainDeclination || null;
    this.declinations = declinations;
    this.textLength = textLength;
    this.isButtons = buttons;
    this.maxWidth = maxWidth;
    this.parentElement = this.createEl(element);
    this.totalCount = 0;
    this.createUpperField();
    this.menu = this.createMenu();
    this.addEventsByClickOnItems();
    this.addEventsForHide();
    this.items = this.createItems(titles);
    this.createButtons();
    this.menu.insertAdjacentHTML('afterbegin', [this.items, this.buttons].join(''));
    this.setEventsForPlusMinus();
    this.setEventsForButtons();
  }
}

export default DropdownChoose;
