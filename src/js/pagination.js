$(document).ready(function(){
	   $('.pagination').pagination({
        items: 15,
        itemsOnPage: 1,
        displayedPages: 3,
        edges: 1,
        cssStyle: 'light-theme',
        prevText: '',
        nextText: '<svg class="arrow-forward"><use xlink:href="#arrow_forward"></use></svg>',
        onPageClick: function(){
        	$('.current').text == 1 ? this.prevText = '' : 'Prev';
        	console.log($('.current').html)
        },
    });
});