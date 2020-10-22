import DropdownChoose from '../blocks/dropdown-choose/dropdown-choose'

// svg-sprite
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets/img/icons/', true, /\.svg$/));


// fetch('https://mycdn.com/img/icons.svg').then((res) => res.text()).then((data) => {
//   document.getElementById('svg-icons').innerHTML = data;
// });


// дропдаун гостей
const guests = document.querySelector('.js-dropdown-guests')
const dropdownGuests = new DropdownChoose(guests, 'Сколько гостей', 'взрослые', 'дети', 'младенцы')