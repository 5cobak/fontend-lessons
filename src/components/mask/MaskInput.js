export default class MaskInput {
  constructor(inputs) {
    this.inputs = inputs;
    this.init();
  }

  init() {
    function validateDate(value, element) {
      function appendError(message) {
        const err = `
          <div class="validate-error">${message}</div>
        `;
        element.parentElement.insertAdjacentHTML('beforeend', err);
      }
      function deleteError() {
        const err = element.parentElement.querySelector('.validate-error');
        if (err) err.remove();
      }
      const arrD = value.split('.');

      arrD[1] -= 1;

      const date = new Date(arrD[2], arrD[1], arrD[0]);

      if (date.getFullYear() !== +arrD[2]) {
        deleteError();
        appendError('Введена некорректная дата!');
        element.value = 'ДД.ММ.ГГГГ';
        element.focus();
        return false;
      } else if (date.getMonth() !== +arrD[1]) {
        deleteError();
        appendError('Введена некорректная дата!');
        element.value = 'ДД.ММ.ГГГГ';
        element.focus();
        return false;
      } else if (date.getDate() !== +arrD[0]) {
        deleteError();
        appendError('Введена некорректная дата!');
        element.value = 'ДД.ММ.ГГГГ';
        element.focus();
        return false;
      } else {
        deleteError();
        return true;
      }
    }
    const elements = document.querySelectorAll('.js-date-masked');

    elements.forEach((item) => {
      $(item).inputmask('99.99.9999', {
        placeholder: 'ДД.ММ.ГГГГ',
        oncomplete: () => {
          const val = $('.js-date-masked').val();
          validateDate(val, item);
        },
      });
    });
  }
}
