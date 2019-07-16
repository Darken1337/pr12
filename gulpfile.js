'use strict';
      
global.$ = {
  gulp: require('gulp'),
  plag: require('gulp-load-plugins')(),
  bs: require('browser-sync').create(),
  del: require('del'),
  uglifyEs: require('gulp-uglify-es').default,

  path: {
    tasks: require('./gulp/config/tasks.js')
  }
};

$.path.tasks.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
  $.gulp.parallel('pug', 'styles:dev', 'scripts:dev', 'img:dev', 'fonts', 'scripts-lib', 'styles:libs', 'scripts:modules'),
    $.gulp.parallel('watch', 'server')
  )
);

$.gulp.task('build',
  $.gulp.series(
    'clean',
    $.gulp.parallel('pug:build', 'styles:build', 'styles:libs', 'scripts:build', 'img:dev', 'fonts', 'scripts-lib', 'styles:base', 'scripts:modules')
  )
);

$.gulp.task('default',
  $.gulp.series(
    'dev',
    $.gulp.parallel('watch', 'server')
  )
);
