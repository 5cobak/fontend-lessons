export default class RateButton {
  constructor(parents) {
    this.parents = parents;
    this.init();
  }

  addEvents() {
    this.parents.forEach((parent) => {
      const inputs = parent.querySelectorAll('.js-rate-button__input');

      inputs.forEach((item) => {
        function paintStars(e) {
          inputs.forEach((input) => {
            input.checked = false;
          });
          e.target.checked = true;
          for (let i = 0; i < 5; i += 1) {
            if (inputs[i] === e.target) break;
            else inputs[i].checked = true;
          }
        }
        item.addEventListener('change', paintStars);
      });
    });
  }

  init() {
    this.addEvents();
  }
}
