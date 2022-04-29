const {src, dest} 	= require('gulp');
const path 			= require('./../config/path.js');
// const webpack 		= require('webpack-stream');
const uglify 		= require('gulp-uglify');		//минификатор js, не нужен при webpack mode: production


function js() {
	return src(path.app.js, { sourcemaps: true })
	// .pipe(webpack({
	// 	mode: "development"
	// }))
	// .pipe(uglify())
	.pipe(dest(path.dist.js, { sourcemaps: true }))
}

module.exports = js;