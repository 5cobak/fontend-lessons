// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

// svg-sprite-loader

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets/img/icons/', true, /\.svg$/));


fetch('https://mycdn.com/img/icons.svg').then((res) => res.text()).then((data) => {
  document.getElementById('svg-icons').innerHTML = data;
});


// clone datepikcer for cards-page

// $('.date-picker-container').append(cloneDatepicker);


// mask
$(window).scroll(() => {
  const topY = $(document).scrollTop();
  if (topY < 300) $('.header').css({ top: '0', position: 'relative' });
  else $('.header').css({ top: '0', position: 'fixed' });
});
