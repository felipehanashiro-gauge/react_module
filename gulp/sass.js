var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    arg = require('yargs').argv;


gulp.task('sass', function () {
    var projectName = arg.project;
    return gulp.src(['./src/main/webapp/'+projectName+'/sass/**/*.scss'])
    .pipe(sass({
        outputStyle: 'compressed',
        errLogToConsole: true,
        onError: function(err) {
        }
    }))
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('./src/main/webapp/'+projectName+'/dist'));
});