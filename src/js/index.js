/* eslint-disable no-unused-vars */
import DateDropdown from '../blocks/date-dropdown/date-dropdown-js/date-dropdown';
import DropdownChoose from '../blocks/dropdown-choose/dropdown-choose';

// svg-sprite
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets/img/icons/', true, /\.svg$/));

// fetch('https://mycdn.com/img/icons.svg').then((res) => res.text()).then((data) => {
//   document.getElementById('svg-icons').innerHTML = data;
// });

// дропдаун гостей
const guests = document.querySelector('.js-dropdown-guests');
const dropdownGuests = new DropdownChoose({
  element: guests,
  placeholder: 'Сколько человек',
  titles: ['взрослые', 'дети', 'младенцы'],
  declinations: [
    ['взрослый', 'взрослых', 'взрослых'],
    ['дитё', 'детей', 'детей'],
    ['младенец', 'младенцев', 'младенцев'],
  ],
  maxWidth: 320,
  textLength: 30,
  buttons: true,
});
// дропдаун кроватей
const beds = document.querySelector('.js-dropdown-beds');
const dropdownBeds = new DropdownChoose({
  element: beds,
  placeholder: 'Сколько спален',
  titles: ['спальни', 'кровати', 'ванные комнаты'],
  declinations: [
    ['спальня', 'спальни', 'спальня'],
    ['кровать', 'кровати', 'кроватей'],
    ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  ],
  maxWidth: 266,
  textLength: 15,
  buttons: false,
});

// дропдаун даты
