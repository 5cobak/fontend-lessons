export default class DropdownChoose {
  constructor(element,placeholder,...args){
    this.placeholder = placeholder;
    this.args = args;
    this.parentElement = this.createEl(element);
    this.createUpperField();
    this.menu = this.createMenu();
    this.showMenu();
    this.items = this.createItems(args);
    this.menu.insertAdjacentHTML('afterbegin',this.items);
    this.setEventsForPlusMinus();
  }
  createEl(element){
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-choose';
    element.append(dropdown);
    return dropdown;
  }
  createUpperField() {
    const upperField = `
    <div class='dropdown-choose__upper-field'>
      <span class='dropdown-choose__main-text'>${this.placeholder}</span>
      <div class='dropdown-choose__arrow'></div>
    </div>
    `
    this.parentElement.insertAdjacentHTML('afterbegin',upperField);
  }
  createMenu() {
    const menu = document.createElement('div');
    menu.className = 'dropdown-choose__menu'; 
    this.parentElement.append(menu);
    return menu;
  }
  createPlusMinus(){
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
    `
  }
  createItems(items) {
    const itemsArray = items.map(item=> {
      return `
      <div class='dropdown-choose__item'>
        <div class='dropdown-choose__item-text'>
          ${item}
        </div>
        ${this.createPlusMinus()}
      </div>
      `
    })
   return itemsArray.join('');
  }
  
  showMenu() {
    function show(e) {
      const targetField = e.target.closest('.dropdown-choose__upper-field');
      if(!targetField) return;
      const menu = targetField.parentElement.querySelector('.dropdown-choose__menu');
      const arrow = targetField.parentElement.querySelector('.dropdown-choose__arrow');
    
      $(targetField.parentElement).toggleClass('dropdown-choose_active')
      $(menu).toggleClass('dropdown-choose__menu_active')
      $(arrow).toggleClass('dropdown-choose__arrow_active')
      $(targetField).toggleClass('dropdown-choose__upper-field_active')
    }
    $(this.parentElement).on('click', show)
  }
  changeTextInUpperField() {
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    const upperField = this.parentElement.querySelector('.dropdown-choose__upper-field');
    const upperFieldText = upperField.querySelector('.dropdown-choose__main-text');
    items.map = [].map;
    let currentItems = [];


    currentItems = items.map(item =>{
      if(count === 0) {

        return;
      };
      const count = item.querySelector('.dropdown-choose__item-count').innerText;
      const text = item.querySelector('.dropdown-choose__item-text').innerText;
      
      return `${declOfNum(count, text)}`;
    })

    const rightItems = currentItems.filter(item=>item[0] !== '0');
    console.log(rightItems);
    upperFieldText.innerHTML = rightItems;
    if(rightItems.length < 1) upperFieldText.innerHTML = this.placeholder;
  }
  
  setEventsForPlusMinus(){
    const cahgePlaceHolder = this.changeTextInUpperField.bind(this);
    const items = this.menu.querySelectorAll('.dropdown-choose__item');
    items.forEach(item=>{
      const plus = item.querySelector('.dropdown-choose__plus');
      const minus = item.querySelector('.dropdown-choose__minus');
      const countItem = item.querySelector('.dropdown-choose__item-count');
      let count = 0;
      function incrementCount() {
        $(minus).removeClass('dropdown-choose__minus_noactive')
        count+=1;
        countItem.innerHTML = count;
        cahgePlaceHolder()
      }
      function decrementCount(){
        if(count === 0) return;
        count-=1;
        countItem.innerHTML = count;

        if(count === 0) $(minus).addClass('dropdown-choose__minus_noactive')
        cahgePlaceHolder()
      }
      $(plus).on('click', incrementCount)
      $(minus).on('click', decrementCount)
    })
  }

  
}

