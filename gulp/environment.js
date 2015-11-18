var gulp = require('gulp'),
    inject = require('gulp-inject'),
    arg = require('yargs').argv;


gulp.task('injectEnvironmentFiles', function () {
    var projectName = arg.project;
    var env = arg.env || 'prod';
    var envFile = './src/main/webapp/base/javascripts/modules/' + (env === 'dev' ? 'ENV_DEV' : 'ENV_PROD') + '.js';


    var target = gulp.src('./src/main/webapp/'+projectName+'/dist/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([envFile], {read: false});

    return target.pipe(inject(sources,{
        starttag: '<!-- ENV_FILES -->',
        endtag: '<!-- endENV_FILES -->',
        relative: true,
        addPrefix: '../../public',
        ignorePath: '..'
    }))
        .pipe(gulp.dest('./src/main/webapp/'+projectName+'/dist'));
});