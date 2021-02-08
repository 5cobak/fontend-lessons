export default class RateButton {
  constructor(parents) {
    this.parents = parents;
    this.init();
  }

  paintStars(e) {
    const inputs = this.parents[0].querySelectorAll('.js-rate-button__input');
    inputs.forEach((input) => {
      const star = input.nextSibling;
      const starLeft = star.offsetLeft;
      const currentStarLeft = e.target.nextSibling.offsetLeft;
      if (starLeft <= currentStarLeft) {
        input.checked = true;
      } else input.checked = false;
    });
  }

  addEvents() {
    this.parents.forEach((parent) => {
      const inputs = parent.querySelectorAll('.js-rate-button__input');
      const paintStars = this.paintStars.bind(this);
      inputs.forEach((item) => {
        item.addEventListener('change', paintStars);
      });
    });
  }

  init() {
    this.addEvents();
  }
}
