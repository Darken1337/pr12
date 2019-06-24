module.exports = function() {
  $.gulp.task('watch',  () => {
    $.gulp.watch('src/pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('src/static/sass/**/*', $.gulp.series('styles:dev'));
    $.gulp.watch('src/static/js/**/*.js', $.gulp.series('scripts:dev'));
    $.gulp.watch('src/static/img/*.{png,jpeg,gif}', $.gulp.series('img:dev'));
  })
}