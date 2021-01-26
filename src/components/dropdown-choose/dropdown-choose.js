import DropdownChoose from './DropdownChoose';

$(document).ready(() => {
  // дропдауны гостей
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
        textLength: 25,
        buttons: true,
      });
    });
  }

  // дропдауны кроватей
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
        textLength: 25,
        buttons: false,
      });
    });
  }
});
