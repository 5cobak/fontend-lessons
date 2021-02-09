import declOfNum from './declOfNum';

const Chart = require('chart.js');

export default class CircleDiagram {
  constructor(parent) {
    this.mainEl = parent;
    this.init();
  }

  injectReviews() {
    const { mainEl } = this;

    const { voices } = mainEl.dataset;
    const voicesEl = mainEl.querySelector('.circle-diagram__voices');
    const voicesNumEl = voicesEl.querySelector('.circle-diagram__num');
    const voicesText = `<div class='circle-diagram__voices-text'>${declOfNum(voices, ['голос', 'голоса', 'голосов'])}</div>`;
    voicesNumEl.innerHTML = voices;
    voicesEl.insertAdjacentHTML('beforeEnd', voicesText);
  }

  createCircleDiagram() {
    const el = this.mainEl.querySelector('#CircleDiagram');
    if (!el) return;
    const gradientOrange = el.getContext('2d').createLinearGradient(0, 0, 0, 100);
    const gradientPurple = el.getContext('2d').createLinearGradient(0, 0, 0, 100);
    const gradientGreen = el.getContext('2d').createLinearGradient(0, 0, 0, 100);

    gradientOrange.addColorStop(0, '#FFE39C');
    gradientOrange.addColorStop(1, '#FFBA9C ');

    gradientPurple.addColorStop(0, '#BC9CFF');
    gradientPurple.addColorStop(1, '#8BA4F9');

    gradientGreen.addColorStop(0, ' #6FCF99');
    gradientGreen.addColorStop(1, '#6BD0BE');

    new Chart(el, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [5, 5, 10, 0],
            backgroundColor: [gradientPurple, gradientGreen, gradientOrange],
            borderWidth: 2,
          },
        ],
        labels: ['Удовлетворительно', 'Хорошо', 'Великолепно'],
      },
      options: {
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        cutoutPercentage: 90,
      },
    });
  }

  init() {
    this.injectReviews();
    this.createCircleDiagram();
  }
}
