const {src, dest} 	= require('gulp');
const path 			= require('./../config/path.js');

function audio() {
	return src(path.app.audio)
	.pipe(dest(path.dist.audio))
}

module.exports = audio;