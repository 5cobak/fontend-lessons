// JS
import './js/'

// SCSS
import './assets/scss/main.scss'
import '../node_modules/jquery-mask-plugin/src/jquery.mask.js'
import '../node_modules/air-datepicker/src/js/datepicker.js'
import '../node_modules/air-datepicker/src/sass/datepicker.scss'


// CSS (example)
// import './assets/css/main.css'

// Vue.js
// window.Vue = require('vue')

// Vue components (for use in html)
// Vue.component('example-component', require('./components/Example.vue').default)

// Vue init
// const app = new Vue({
//   el: '#app'
// })

import $ from 'jquery';
 
global.jQuery = $;
global.$ = $;

console.log($);