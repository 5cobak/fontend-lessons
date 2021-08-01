import DropdownChoose from './DropdownChoose';

$(document).ready(() => {
  // дропдауны гостей
  const guestsList = document.querySelectorAll('.js-dropdown-guests');

  if (guestsList) {
    guestsList.forEach((item) => {
      new DropdownChoose({
        element: item,
        title: 'Гости',
        placeholder: 'Сколько гостей',
        titles: ['взрослые', 'дети', 'младенцы'],
        inputName: 'input-guests',
        inputId: 'input-guests',
        mainDeclination: ['Гость', 'Гостя', 'Гостей'],
        declinations: [['младенец', 'младенцев', 'младенцев']],
        textLength: 20,
        withButtons: true,
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
        inputName: 'input-comforts',
        inputId: 'input-comforts',
        declinations: [
          ['спальня', 'спальни', 'спальня'],
          ['кровать', 'кровати', 'кроватей'],
          ['ванная комната', 'ванные комнаты', 'ванных комнат'],
        ],
        textLength: 20,
      });
    });
  }
});
