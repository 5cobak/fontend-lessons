// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

//svg-sprite-loader

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets/img/icons/', true, /\.svg$/));


fetch(`https://mycdn.com/img/icons.svg`).then(res => {
  return res.text();
}).then(data => {
  document.getElementById('svg-icons').innerHTML = data;
});


// item-quantity-dropdown js



// mask 

$(document).ready(function(){
  $('.date-field').mask('00.00.0000')
});

// air-datePicker 

$('.my-datepicker').datepicker()

// air-datePicker 

// $('.datepicker-here').datepicker();

// Доступ к экземпляру объекта
// $('.datepicker-here').data('datepicker');

