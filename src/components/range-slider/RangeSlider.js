class RangeSlider {
  constructor(input) {
    this.input = input;
    this._init();
  }

  _writeValues() {
    const parentEl = this.input.parentElement;
    const domValues = parentEl.querySelector('.js-range-slider__values');

    const from = parentEl.querySelector('.irs-from');
    const to = parentEl.querySelector('.irs-to');

    domValues.innerHTML = `${from.innerHTML}₽ - ${to.innerHTML}₽`;
  }

  _createRangeSlider() {
    const writeValues = this._writeValues.bind(this);
    const $input = $(this.input);

    $input.ionRangeSlider({
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
  }

  _init() {
    this._createRangeSlider();
  }
}

export default RangeSlider;
