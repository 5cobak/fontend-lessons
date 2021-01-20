export default class PriceCalculator {
  constructor({ parent, inputs, price }) {
    this.init(parent, inputs, price);
  }

  calculate() {
    const date1 = this.firstInput.value.split('.').map((item) => Number(item));
    const date2 = this.secondInput.value.split('.').map((item) => Number(item));

    const firstDate = new Date(date1[2], date1[1] - 1, date1[0]);
    const secondDate = new Date(date2[2], date2[1] - 1, date2[0]);

    const daysLag = Math.ceil(Math.abs(secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24));

    const sum = daysLag * this.price;

    const elementOfPrice = this.parent.querySelector('.js-card-book__calc-sum');

    elementOfPrice.innerHTML = sum;
  }

  init(parent, inputs, price) {
    this.parent = parent;
    this.firstInput = inputs[0];
    this.secondInput = inputs[1];
    this.price = price;
  }
}
