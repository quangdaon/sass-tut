const gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	hljs = require('gulp-highlight'),
	sync = require('browser-sync');

const isDev = process.env.NODE_ENV === 'development';

gulp.task('sass', () => {
	const src = isDev ? 'sass-final' : 'sass';
	return gulp.src(`./src/${src}/**/**/*.scss`)
		.pipe(sass({
			outputStyle: 'expanded',
			indentType: 'space',
			indentWidth: 4
		}).on('error', sass.logError))
		.pipe(prefix())
		.pipe(gulp.dest('./build/css'))
		.pipe(sync.stream());
});

gulp.task('pug', () => {
	return gulp.src(`./src/views/**/**/*.pug`)
		.pipe(pug())
		.pipe(hljs())
		.pipe(gulp.dest('./build'))
		.pipe(sync.stream());
});

gulp.task('watch', () => {
	sync({
		port: 5000, // use *different* port than above
		server: {
			baseDir: './build'
		},
		notify: false,
		ghostMode: false
	});

	if (isDev) {
		gulp.watch('src/sass-final/**/*.scss', ['sass']);
		gulp.watch('src/views/**/*.pug', ['pug']);
	} else {
		gulp.watch('src/sass/**/*.scss', ['sass']);
		gulp.watch('build/**/*.html', sync.reload);
	}
});

const defs = isDev ? ['pug', 'sass', 'watch'] : ['sass', 'watch'];

gulp.task('default', defs);