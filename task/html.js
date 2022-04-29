const {src, dest} 	= require('gulp');
const include		= require('gulp-file-include');
const path 			= require('./../config/path.js');

function html() {
	return src(path.app.html)
	.pipe(include())
	.pipe(dest(path.dist.html))
}

module.exports = html;