import '~/ion-rangeslider/js/ion.rangeSlider';

class RangeSlider {
  constructor(input) {
    this.input = input;
    this._init();
  }

  _writeValues() {
    const parentEl = this.input.parentElement;
    const values = parentEl.querySelector('.js-range-slider__values');

    const from = parentEl.querySelector('.irs-from');
    const to = parentEl.querySelector('.irs-to');

    values.innerHTML = `${from.innerHTML}₽ - ${to.innerHTML}₽`;
  }

  _bindHandlers() {
    this._handleChange = this._handleChange.bind(this);
    this._handleFinish = this._handleChange.bind(this);
  }

  _handleChange() {
    this._writeValues();
  }

  _handleFinish() {
    this._writeValues();
  }

  _init() {
    this._bindHandlers();
    const handleChange = this._handleChange;
    const handleFinish = this._handleFinish;
    const $input = $(this.input);

    $input.ionRangeSlider({
      type: 'double',
      skin: 'round',
      min: 0,
      max: 15000,
      from: 5000,
      to: 10000,
      onFinish: handleFinish,
      onChange: handleChange,
      hide_min_max: true,
    });
  }
}

export default RangeSlider;
