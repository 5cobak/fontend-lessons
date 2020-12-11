const Chart = require('chart.js');

$(document).ready(() => {
  const el = document.getElementById('CircleDiagram');
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

  const myChart = new Chart(el, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          label: '# of Votes',
          data: [2.5, 2.5, 5, 0],
          // labels: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
          backgroundColor: [gradientPurple, gradientGreen, gradientOrange],
          borderWidth: 2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 90,
      // scales: {
      //   xAxes: [
      //     {
      //       ticks: {
      //         padding: 20,
      //       },
      //     },
      //   ],
      // },
    },
  });
});
