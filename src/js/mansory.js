
$(document).ready(function(){
	var Masonry = require('masonry-layout');

	var msnry = new Masonry( '.cards-page__wrapper', {
	  itemSelector: '.card',
	  columnWidth: '.card',
	  gutter: 40,
	});
})
