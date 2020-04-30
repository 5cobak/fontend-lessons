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


//clone datepikcer for cards-page

// $('.date-picker-container').append(cloneDatepicker);


// mask 


