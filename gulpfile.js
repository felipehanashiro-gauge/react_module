var gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('default',['server']);


/*#################################
############ COMMANDS  ############
###################################

### UP DEVELOPMENT SERVER ( with react live reload )
    $ gulp serve --project={project name}


### UP PRODUCTION SERVER ( with browser refresh )
    $ gulp serve --project={project name} --env=prod


### BUILD PROJECT
    $ gulp build:{projectName}


### BUILD ALL PROJECTS
    $ gulp buildAll


*/