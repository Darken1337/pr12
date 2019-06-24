module.exports = function() {
  $.gulp.task('server', function () {
    $.bs.init({
      injectChanges: true,
      server: "./build"
    })
  });
}