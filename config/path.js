const app = './app';
const dist = './dist';

module.exports = {
	root: dist,

	app: {
		html: app + '/*.html',
		css: app + '/scss/**/*.scss',
		js: app + '/js/**/*.js',
		img: app + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		font: app + '/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		audio: app + '/audio/**/*.mp3'
	},

	dist: {
		html: dist,
		css: dist + '/css',
		js: dist + '/js',
		img: dist + '/img',
		font: dist + '/font',
		audio: dist + '/audio'

	},

	watch: {
		html: app + '/**/*.html',
		css: app + '/scss/**/*.scss',
		js: app + '/js/**/*.js',
		img: app + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		font: app + '/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		audio: app + '/audio/**/*.mp3'
	},

	clean: {
		dist,
	}
}

