export default class DropdownChoose {
  constructor({ element, placeholder, titles, declinations, maxWidth, textLength, buttons }) {
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
    this.buttons = this.createButtons();
    this.menu.insertAdjacentHTML('afterbegin', [this.items, this.buttons].join(''));
    this.setEventsForPlusMinus();
    this.setEventsForButtons();
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
    return `
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
    const itemsArray = items.map(
      (item) => `
      <div class='dropdown-choose__item'>
        <div class='dropdown-choose__item-text'>
          ${item}
        </div>
        ${this.createPlusMinus()}
      </div>
      `
    );
    return itemsArray.join('');
  }

  createButtons() {
    if (!this.isButtons) return;

    return `
      <div class='dropdown-choose__buttons'>
        <div class='dropdown-choose__btn-clear dropdown-choose__btn-clear_hidden'>Отчистить</div>
        <div class='dropdown-choose__btn-access'>Применить</div>
      </div>
    `;
  }

  addEventsByClickOnItems() {
    function show(e) {
      const targetField = e.target.closest('.dropdown-choose__upper-field');

      if (!targetField) return;
      const menu = targetField.parentElement.querySelector('.dropdown-choose__menu');
      const arrow = targetField.parentElement.querySelector('.dropdown-choose__arrow');
      $(targetField.parentElement).toggleClass('dropdown-choose_active');
      $(menu).toggleClass('dropdown-choose__menu_active');
      $(arrow).toggleClass('dropdown-choose__arrow_active');
      $(targetField).toggleClass('dropdown-choose__upper-field_active');
    }
    function hideAll(e) {
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
    $(document).on('click', hideAll);
    $(this.parentElement).on('click', show);
  }

  changeTextInUpperField() {
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    const upperField = this.parentElement.querySelector('.dropdown-choose__upper-field');
    const upperFieldText = upperField.querySelector('.dropdown-choose__main-text');
    const buttonClear = this.parentElement.querySelector('.dropdown-choose__btn-clear');

    items.map = [].map;
    items.reduce = [].reduce;
    let currentItems = [];

    function declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    }
    currentItems = items.map((item, index) => {
      const count = item.querySelector('.dropdown-choose__item-count').innerText;
      if (count === 0) {
        return;
      } else {
        const declinedWord = `${count} ${declOfNum(count, this.declinations[index])}`;
        return declinedWord;
      }
    });
    this.totalCount = 0;
    const countElemns = this.menu.querySelectorAll('.dropdown-choose__item-count');
    countElemns.map = [].map;
    countElemns.reduce = [].reduce;
    const sumOfCounts = countElemns.map((item) => +item.innerText).reduce((acc, item) => acc + item);
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

  setEventsForPlusMinus() {
    const changePlaceHolder = this.changeTextInUpperField.bind(this);
    const items = this.menu.querySelectorAll('.dropdown-choose__item');

    items.forEach((item) => {
      const plus = item.querySelector('.dropdown-choose__plus');
      const minus = item.querySelector('.dropdown-choose__minus');

      function incrementCount() {
        const countItem = item.querySelector('.dropdown-choose__item-count');
        let count = Number(countItem.innerText);
        $(minus).removeClass('dropdown-choose__minus_noactive');
        count += 1;
        countItem.innerHTML = count;
        changePlaceHolder();
      }

      function decrementCount() {
        const countItem = item.querySelector('.dropdown-choose__item-count');
        let count = Number(countItem.innerText);
        if (count === 0) return;
        count -= 1;
        countItem.innerHTML = count;

        if (count === 0) $(minus).addClass('dropdown-choose__minus_noactive');
        changePlaceHolder();
      }

      $(plus).on('click', incrementCount);
      $(minus).on('click', decrementCount);
    });
  }

  setEventsForButtons() {
    const menu = this.menu;
    const mainText = this.parentElement.querySelector('.dropdown-choose__main-text');
    const upperField = mainText.parentElement;
    const that = this;
    const clearBtn = this.menu.querySelector('.dropdown-choose__btn-clear');
    const accessBtn = this.menu.querySelector('.dropdown-choose__btn-access');
    const arrow = this.parentElement.querySelector('.dropdown-choose__arrow');

    function clearUpperTextField() {
      const itemCounts = menu.querySelectorAll('.dropdown-choose__item-count');
      itemCounts.map = [].map;
      itemCounts.map((item) => {
        item.innerText = 0;
        return item;
      });

      const minuses = menu.querySelectorAll('.dropdown-choose__minus');
      minuses.forEach((item) => item.classList.add('dropdown-choose__minus_noactive'));
      mainText.innerText = that.placeholder;
      $(clearBtn).addClass('dropdown-choose__btn-clear_hidden');
    }

    function accessValue() {
      $(upperField.parentElement).removeClass('dropdown-choose_active');
      $(menu).removeClass('dropdown-choose__menu_active');
      $(arrow).removeClass('dropdown-choose__arrow_active');
      $(upperField).removeClass('dropdown-choose__upper-field_active');
    }

    $(clearBtn).on('click', clearUpperTextField);
    $(accessBtn).on('click', accessValue);
  }
}
