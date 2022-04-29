const {src, dest} 	= require('gulp');
const path 			= require('./../config/path.js');
const fonter		= require('gulp-fonter');
const ttf2woff2 	= require('gulp-ttf2woff2')


function font() {
	return src(path.app.font)
	.pipe(fonter({
		formats: ['ttf', 'woff', 'woff2','eot', 'svg']
	}))
	.pipe(dest(path.dist.font))
	.pipe(ttf2woff2())
	.pipe(dest(path.dist.font))
}

module.exports = font;