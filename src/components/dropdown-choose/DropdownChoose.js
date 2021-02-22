import declination from '../helpers/declination';

export default class DropdownChoose {
  constructor({ element, placeholder, titles, declinations, maxWidth, textLength, buttons }) {
    this.init(element, placeholder, titles, declinations, maxWidth, textLength, buttons);
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
      <div class='dropdown-choose__minus dropdown-choose__minus_noactive'>
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
    const menu = targetField.parentElement.querySelector('.dropdown-choose__menu');
    const arrow = targetField.parentElement.querySelector('.dropdown-choose__arrow');
    $(targetField.parentElement).toggleClass('dropdown-choose_active');
    $(menu).toggleClass('dropdown-choose__menu_active');
    $(arrow).toggleClass('dropdown-choose__arrow_active');
    $(targetField).toggleClass('dropdown-choose__upper-field_active');
  }

  hideAllDropdowns(e) {
    const target = e.target.closest('.dropdown-choose');
    if (target) return;
    const $targetField = $('.dropdown-choose__upper-field');
    const $menu = $('.dropdown-choose__menu');
    const $arrow = $('.dropdown-choose__arrow');

    $($targetField).parent().removeClass('dropdown-choose_active');
    $($menu).removeClass('dropdown-choose__menu_active');
    $($arrow).removeClass('dropdown-choose__arrow_active');
    $($targetField).removeClass('dropdown-choose__upper-field_active');
  }

  addEventsByClickOnItems() {
    const hideAll = this.hideAllDropdowns.bind(this);
    const showCurrent = this.showCurrentDropdown.bind(this);
    $(document).on('click', hideAll);
    $(this.parentElement).on('click', showCurrent);
  }

  changeTextInUpperField() {
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    const upperField = this.parentElement.querySelector('.dropdown-choose__upper-field');
    const upperFieldText = upperField.querySelector('.dropdown-choose__main-text');
    const buttonClear = this.parentElement.querySelector('.dropdown-choose__btn-clear');

    items.map = [].map;
    items.reduce = [].reduce;
    let currentItems = [];

    currentItems = items.map((item, index) => {
      const count = item.querySelector('.dropdown-choose__item-count').innerText;
      if (count === 0) {
        return false;
      } else {
        const declinedWord = `${count} ${declination(count, this.declinations[index])}`;
        return declinedWord;
      }
    });
    this.totalCount = 0;
    const countElements = this.menu.querySelectorAll('.dropdown-choose__item-count');
    countElements.map = [].map;
    countElements.reduce = [].reduce;
    const sumOfCounts = countElements.map((item) => +item.innerText).reduce((acc, item) => acc + item);
    this.totalCount = sumOfCounts;

    if (this.totalCount === 0) $(buttonClear).addClass('dropdown-choose__btn-clear_hidden');
    else if (this.totalCount > 0) $(buttonClear).removeClass('dropdown-choose__btn-clear_hidden');

    let rightItems = currentItems.filter((item) => item[0] !== '0').join(',');

    if (rightItems.length > this.textLength) {
      rightItems = `${rightItems.slice(0, this.textLength)}...`;
    }

    upperFieldText.innerHTML = rightItems;

    if (rightItems.length < 1) upperFieldText.innerHTML = this.placeholder;
  }

  incrementCount(e) {
    const plus = e.currentTarget;
    const item = plus.parentElement;
    const countItem = item.querySelector('.dropdown-choose__item-count');
    const minus = item.querySelector('.dropdown-choose__minus');

    let count = Number(countItem.innerText);
    $(minus).removeClass('dropdown-choose__minus_no-active');
    count += 1;

    countItem.innerHTML = count;
    this.changeTextInUpperField();
  }

  decrementCount(e) {
    const minus = e.currentTarget;
    const item = minus.parentElement;
    const countItem = item.querySelector('.dropdown-choose__item-count');
    let count = Number(countItem.innerText);
    if (count === 0) return;
    count -= 1;
    countItem.innerHTML = count;

    if (count === 0) $(minus).addClass('dropdown-choose__minus_no-active');
    this.changeTextInUpperField();
  }

  setEventsForPlusMinus() {
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    const increment = this.incrementCount.bind(this);
    const decrement = this.decrementCount.bind(this);

    items.forEach((item) => {
      const plus = item.querySelector('.dropdown-choose__plus');
      const minus = item.querySelector('.dropdown-choose__minus');

      plus.addEventListener('click', increment);
      minus.addEventListener('click', decrement);
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
    minuses.forEach((item) => item.classList.add('dropdown-choose__minus_noactive'));
    mainText.innerText = this.placeholder;
    $(clearBtn).addClass('dropdown-choose__btn-clear_hidden');
  }

  hideDropdownMenu() {
    const { menu } = this;
    const mainText = this.parentElement.querySelector('.dropdown-choose__main-text');
    const upperField = mainText.parentElement;
    const arrow = this.parentElement.querySelector('.dropdown-choose__arrow');
    $(upperField.parentElement).removeClass('dropdown-choose_active');
    $(menu).removeClass('dropdown-choose__menu_active');
    $(arrow).removeClass('dropdown-choose__arrow_active');
    $(upperField).removeClass('dropdown-choose__upper-field_active');
  }

  setEventsForButtons() {
    const { menu } = this;

    const clearBtn = menu.querySelector('.dropdown-choose__btn-clear');
    const accessBtn = menu.querySelector('.dropdown-choose__btn-access');

    const clearUpperTextField = this.clearUpperTextField.bind(this);
    const hideDropdownMenu = this.hideDropdownMenu.bind(this);

    $(clearBtn).on('click', clearUpperTextField);
    $(accessBtn).on('click', hideDropdownMenu);
  }

  init(element, placeholder, titles, declinations, maxWidth, textLength, buttons) {
    this.placeholder = placeholder;
    this.declinations = declinations;
    this.textLength = textLength;
    this.isButtons = buttons;
    this.maxWidth = maxWidth;
    this.parentElement = this.createEl(element);
    this.totalCount = 0;
    this.createUpperField();
    this.menu = this.createMenu();
    this.addEventsByClickOnItems();
    this.items = this.createItems(titles);
    this.createButtons();
    this.menu.insertAdjacentHTML('afterbegin', [this.items, this.buttons].join(''));
    this.setEventsForPlusMinus();
    this.setEventsForButtons();
  }
}
