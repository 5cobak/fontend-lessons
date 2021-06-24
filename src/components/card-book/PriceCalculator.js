import DateDropdown from '../date-dropdown/DateDropdown';
import declination from '../helpers/declination';

class PriceCalculator {
  constructor(parent) {
    this._init(parent);
  }

  _calculate(daysLag) {
    const card = this.parent;

    const priceForOneDayStr = card.querySelector('.js-card-book__price-for-one-day').innerHTML;
    const priceForOneDayNum = parseFloat(priceForOneDayStr.replace(/\s/g, ''));
    const discountStr = card.querySelector('.js-card-book__discount').innerHTML;
    const discountNum = parseFloat(discountStr.replace(/\s/g, '').match(/\d+/));
    const taxes = card.querySelectorAll('.js-card-book__tax');

    taxes.map = [].map;
    const taxWithDiscount = parseFloat(taxes[0].innerHTML.replace(/\s/g, '').match(/\d+/));
    const taxesSum = taxes
      .map((tax) => parseFloat(tax.innerHTML.replace(/\s/g, '')))
      .reduce((acc, val) => acc + val);
    let cleanSum = daysLag * priceForOneDayNum;
    let totalSum = cleanSum + taxesSum - discountNum;
    if (discountNum) {
      totalSum += taxWithDiscount;
    }
    if (!daysLag) {
      totalSum = 0;
    }
    totalSum = `${totalSum}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    cleanSum = `${cleanSum}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    daysLag = `${daysLag}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

    return {
      totalSum,
      daysLag,
      cleanSum,
    };
  }

  injectHTML() {
    const card = this.parent;
    const cleanSumEl = card.querySelector('.js-card-book__calc-sum');
    const daysEl = card.querySelector('.js-card-book__days');
    const totalSumEl = card.querySelector('.js-card-book__total-price');
    const data = this._calculate(this.dateDropdown.daysLag);

    daysEl.innerHTML = '';
    daysEl.insertAdjacentHTML(
      'beforeEnd',
      `${data.daysLag} ${declination(data.daysLag, ['сутки', 'суток', 'суток'])}`,
    );
    cleanSumEl.innerHTML = '';
    cleanSumEl.insertAdjacentHTML('beforeEnd', `${data.cleanSum}₽`);
    totalSumEl.innerHTML = '';
    totalSumEl.insertAdjacentHTML('beforeEnd', `${data.totalSum}₽`);
  }

  _init(parent) {
    this.parent = parent;
    const dropdownEl = this.parent.querySelector('.js-date-dropdown');
    const customDateDropdown = {};
    customDateDropdown.callback = this.injectHTML.bind(this);
    const ExtendedDropdown = Object.assign(new DateDropdown(dropdownEl), customDateDropdown);
    this.dateDropdown = ExtendedDropdown;
  }
}

export default PriceCalculator;
