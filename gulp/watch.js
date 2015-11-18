'use strict';

var gulp = require('gulp'),
	arg = require('yargs').argv;


gulp.task('watch', ['injectEnvironmentFiles'], function(){
    var projectName = arg.project;
	gulp.watch(['./src/main/webapp/base/sass/**/*.scss','./src/main/webapp/'+projectName+'/sass/**/*.scss'], ['sass']);
	gulp.start('browserify');
});