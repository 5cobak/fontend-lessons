/* eslint-disable no-unused-vars */
import DropdownChoose from '../blocks/dropdown-choose/dropdown-choose';
// svg-sprite
// function requireAll(r) {
//   r.keys().forEach(r);
// }

// requireAll(require.context('../assets/img/icons/', true, /\.svg$/));

// fetch('./assets/img/icons/icons.svg')
//   .then((res) => res.text())
//   .then((data) => {
//     document.getElementById('svg-icons').innerHTML = data;
//   });

// дропдаун гостей
const guestsList = document.querySelectorAll('.js-dropdown-guests');

if (guestsList) {
  guestsList.forEach((item) => {
    const dropodown = new DropdownChoose({
      element: item,
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
  });
}

// дропдаун кроватей
const bedsList = document.querySelectorAll('.js-dropdown-beds');

if (bedsList) {
  bedsList.forEach((item) => {
    const dropodown = new DropdownChoose({
      element: item,
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
  });
}

// дропдаун даты
