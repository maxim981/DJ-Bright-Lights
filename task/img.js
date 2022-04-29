const {src, dest} 	= require('gulp');
const path 			= require('./../config/path.js');
const imagemin		= require('gulp-imagemin');


function img() {
	return src(path.app.img)
	// .pipe(imagemin({
	// 	verbose: true
	// }))
	.pipe(dest(path.dist.img))
}

module.exports = img;