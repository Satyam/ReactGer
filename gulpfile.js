var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var server = require('gulp-develop-server');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var babel = require('gulp-babel');
var documentation = require('gulp-documentation');

gulp.task('default', [
	'eslint', 'less', 'webpack:server', 'server:start', 'watches'
]);

gulp.task('production', [
	'eslint', 'less', 'webpack:build', 'webpack:server', 'server:start:production', 'watches'
]);

gulp.task('watches', ['server:restart', 'webpack:watch', 'less:watch']);

gulp.task('webpack:watch', function () {
	gulp.watch(['src/**/*'], ['webpack:build', 'webpack:server']);
});

gulp.task('build', ['eslint', 'webpack:build', 'webpack:server', 'documentation']);

var wp = function (config, callback) {
	webpack(require(config), function (err /*, stats */) {
		if (err) throw new gutil.PluginError('webpack:build', err);
		/*		gutil.log('[webpack:build]', stats.toString({
					colors: true
				}));*/
		callback();
	});
};

gulp.task('webpack:build', function (callback) {
	wp('./webpack.client.prod.config.js', callback);
});

gulp.task('webpack:server', function (callback) {
	wp('./webpack.server.config.js', callback);
});

gulp.task('less', function () {
	return gulp.src('./src/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./build/'));
});


gulp.task('babel', function () {
	return gulp.src([
		'src/**/*.jsx',
		'src/**/*.js'
	])
	.pipe(babel())
	.pipe(gulp.dest('dist'));
});

gulp.task('documentation', function () {
  gulp.src([
			'src/**/*.jsx',
			'src/**/*.js'
		])
    .pipe(documentation({
			format: 'html',
			github: true
		}))
    .pipe(gulp.dest('docs'));
});

gulp.task('less:watch', function () {
	gulp.watch(['./src/**/*.less'], ['less']);
});

gulp.task('server:start', ['webpack:server'], function (callback) {
	server.listen({
		path: 'server/server.js'
	}, callback);
});

gulp.task('server:start:production', ['webpack:build', 'webpack:server'], function (callback) {
	server.listen({
		path: 'server/server.js',
		args: ['-p']
	}, callback);
});

gulp.task('server:restart', ['server:start'], function () {
	gulp.watch([
		'server/**/*.js',
		'build/server.js'
	], server.restart);
});

gulp.task('eslint', function () {
	return gulp.src([
		'*.js',
		'server/**/*.js',
		'src/**/*.js',
		'src/**/*.jsx'
	])
		.pipe(eslint())
		.pipe(eslint.format());
});
