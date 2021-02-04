const Chart = require('chart.js');

export default class CircleDiagram {
  constructor(parent) {
    this.parent = parent;
    this.init();
  }

  createCircleDiagram() {
    const el = this.parent;
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
    this.createCircleDiagram();
  }
}
