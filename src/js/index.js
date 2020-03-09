// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

// item-quantity-dropdown js

// $(document).ready(() => {
//   $('.iqdropdown').iqDropdown({
//   // max total items
//   maxItems: Infinity,
//   // min total items
//   minItems: 3,
//   // text to show on the dropdown override data-selection-text attribute
//   selectionText: 'item',
//   // text to show for multiple items
//   textPlural: 'items',
//   // optionally can use setSelectionText function to override selectionText
//   setSelectionText: (itemCount, totalItems) => { /* return string */ },
//   // buttons to increment/decrement
//   controls: {
//     position: 'right',
//     displayCls: 'iqdropdown-item-display',
//     controlsCls: 'iqdropdown-item-controls',
//     counterCls: 'counter'
//   },
//   // fires when an item quantity changes
//   onChange: (id, count, totalItems) => {},
//   // return false to prevent an item decrement
//   beforeDecrement: (id, itemCount) => {},
//   // return false to prevent an item increment
//   beforeIncrement: (id, itemCount) => {}

//   });
// });

// mask 

$(document).ready(function(){
  $('.date-field').mask('00.00.0000');
});

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


// air-datePicker 

$('.datepicker-here').datepicker([options]);

// Доступ к экземпляру объекта
$('.datepicker-here').data('datepicker');