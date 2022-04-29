const {src, dest} 	= require('gulp');
const scss 			= require('gulp-sass')(require('sass'));
const path 			= require('./../config/path.js');
const autoprefixer 	= require('gulp-autoprefixer');
const csso 			= require('gulp-csso');
const rename 		= require('gulp-rename');

function css() {
	return src(path.app.css, { sourcemaps: true })
	.pipe(scss())
	.pipe(autoprefixer())
	.pipe(dest(path.dist.css, { sourcemaps: true }))
	.pipe(csso())
	.pipe(rename({ suffix: ".min" }))
	.pipe(dest(path.dist.css, { sourcemaps: true }))
}

module.exports = css;