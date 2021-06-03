import DropdownChoose from './DropdownChoose';

$(document).ready(() => {
  // дропдауны гостей
  const guestsList = document.querySelectorAll('.js-dropdown-guests');

  if (guestsList) {
    guestsList.forEach((item) => {
      new DropdownChoose({
        element: item,
        placeholder: 'Сколько гостей',
        titles: ['взрослые', 'дети', 'младенцы'],
        mainDeclination: ['Гость', 'Гостя', 'Гостей'],
        declinations: [['младенец', 'младенцев', 'младенцев']],
        maxWidth: 320,
        textLength: 20,
        buttons: true,
      });
    });
  }

  // дропдауны кроватей
  const bedsList = document.querySelectorAll('.js-dropdown-beds');

  if (bedsList) {
    bedsList.forEach((item) => {
      new DropdownChoose({
        element: item,
        placeholder: 'Сколько спален',
        titles: ['спальни', 'кровати', 'ванные комнаты'],
        declinations: [
          ['спальня', 'спальни', 'спальня'],
          ['кровать', 'кровати', 'кроватей'],
          ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        ],
        maxWidth: 266,
        textLength: 20,
      });
    });
  }
});
