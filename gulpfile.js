const gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
	sync = require('browser-sync');

gulp.task('sass', () => {
	return gulp.src('./src/sass-final/**/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded',
			indentType: 'space',
			indentWidth: 4
		}).on('error', sass.logError))
		.pipe(prefix())
		.pipe(gulp.dest('./build/css'))
		.pipe(sync.stream());
});

gulp.task('views', () => {
	return gulp.src('./src/views/**/**/*.pug')
		.pipe(pug({
			pretty: '\t'
		}))
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

	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/views/**/*.pug', ['views']);
	//gulp.watch('build/**/*.html', sync.reload);
});

gulp.task('default', ['views', 'sass', 'watch']);