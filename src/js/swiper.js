import Swiper from 'swiper';
$(document).ready(function() {
	var mySwiper = new Swiper('.swiper-container', { 
		init: true,
		speed: 400,
		spaceBetween: 0,
		effect: 'slide',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		initialSlide: 0,
		resistanceRatio: 0
	});
}); 
