class RangeSlider {
  constructor(inputs) {
    this.inputs = inputs;
    this.init();
  }

  writeValues() {
    const parentEl = this.inputs[0].parentElement;
    const domValues = parentEl.querySelector('.js-range-slider__values');

    const from = parentEl.querySelector('.irs-from');
    const to = parentEl.querySelector('.irs-to');

    domValues.innerHTML = `${from.innerHTML}₽ - ${to.innerHTML}₽`;
  }

  createRangeSlider() {
    const writeValues = this.writeValues.bind(this);
    this.inputs.forEach((item) => {
      $(item).ionRangeSlider({
        type: 'double',
        skin: 'round',
        min: 0,
        max: 15000,
        from: 5000,
        to: 10000,
        onFinish: writeValues,
        onChange: writeValues,
        hide_min_max: true,
      });
    });
  }

  init() {
    this.createRangeSlider();
  }
}

export default RangeSlider;
