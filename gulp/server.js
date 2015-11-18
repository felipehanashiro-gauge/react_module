'use strict';

var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    util = require('gulp-util'),
    arg = require('yargs').argv,
    shell = require('gulp-shell');


var defaultPort = 3000;


gulp.task('server', function() {
    var project = arg.project ? arg.project+" project" : "server",
        port = arg.port ? arg.port : defaultPort,
        env = arg.env ? arg.env : 'dev';
    util.log(util.colors.blue( (project+" started on port "+port).toUpperCase() ));

    var sources = [
        './src/main/webapp/**/index.html',
        './src/main/webapp/**/dist/styles.css'
    ];

    if(env === 'prod'){
        sources.push('./src/main/webapp/**/dist/scripts.js');
    }

    var server = gls.static('./src/main/',port);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    return gulp.watch(sources, function (file) {
        server.notify.apply(server, [file]);
    });
});


gulp.task('serve', ['watch','server']);