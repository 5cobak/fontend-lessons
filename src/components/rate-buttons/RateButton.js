export default class RateButton {
  constructor(parents) {
    this.parents = parents;
    this.init();
  }

  init() {
    this.parents.forEach((item) => {
      const inputs = item.querySelectorAll('.js-rate-button__input');

      inputs.forEach((item) => {
        function paintStars(e) {
          inputs.forEach((item) => {
            item.checked = false;
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
}
