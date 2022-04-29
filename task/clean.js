const del 			= require('del');
const path 			= require('./../config/path.js');


function clean(params) {													
	return del(path.root);													
}

module.exports = clean;