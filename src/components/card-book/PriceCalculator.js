import DateDropdown from '../date-dropdown/DateDropdown';

export default class PriceCalculator {
  constructor(parent) {
    this.init(parent);
  }

  calculate(daysLag) {
    const card = this.parent;

    const elementOfPrice = card.querySelector('.js-card-book__calc-sum');
    const priceForOneDayStr = card.querySelector('.js-card-book__price-for-one-day').innerHTML;
    const priceForOneDayNum = parseFloat(priceForOneDayStr.replace(/\s/g, ''));
    const discontStr = card.querySelector('.js-card-book__discont').innerHTML;
    const discontNum = parseFloat(discontStr.replace(/\s/g, '').match(/\d+/));
    const taxes = card.querySelectorAll('.js-card-book__tax');

    taxes.map = [].map;
    const taxWithDiscont = parseFloat(taxes[0].innerHTML.replace(/\s/g, '').match(/\d+/));
    const taxesSum = taxes.map((tax) => parseFloat(tax.innerHTML.replace(/\s/g, ''))).reduce((acc, val) => acc + val);
    let cleanSum = daysLag * priceForOneDayNum;
    let totalSum = cleanSum + taxesSum - discontNum;
    if (discontNum) {
      totalSum -= taxWithDiscont;
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
    const cleanSumEl = card.querySelector('.js-card-book__clean-sum');
    const daysEl = card.querySelector('.js-card-book__days');
    const totalSumEl = card.querySelector('.js-card-book__total-price');
    const data = this.calculate(this.dateDropdown.daysLag);
    const rub = '<span class="card-book__rub">₽</span>';
    function declOfNum(number, words) {
      return words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]];
    }
    daysEl.innerHTML = '';
    daysEl.insertAdjacentHTML('beforeEnd', `${data.daysLag} ${declOfNum(data.daysLag, ['сутки', 'суток', 'суток'])}`);
    cleanSumEl.innerHTML = '';
    cleanSumEl.insertAdjacentHTML('beforeEnd', `${data.cleanSum}${rub}`);
    totalSumEl.innerHTML = '';
    totalSumEl.insertAdjacentHTML('beforeEnd', `${data.totalSum}${rub}`);
  }

  init(parent) {
    this.parent = parent;
    const inputs = this.parent.querySelectorAll('.js-card-book__dropdown-input');
    const customDateDropdown = {};
    customDateDropdown.callback = this.injectHTML.bind(this);
    const ExtendendDropdown = Object.assign(new DateDropdown(inputs), customDateDropdown);
    this.dateDropdown = ExtendendDropdown;
  }
}
