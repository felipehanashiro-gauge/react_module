var gulp = require('gulp'),
    shell = require('gulp-shell');

var projects = [
    'cost',
    'cpms'
];

gulp.task('build', ['injectEnvironmentFiles','sass','compileJS']);


projects.forEach(function(project){
    gulp.task( ('build:'+project) , shell.task(['gulp build --project='+project]));
});

gulp.task('buildAll', projects.map(function(project){ return ('build:'+project) }) );