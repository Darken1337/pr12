module.exports = function() {
  $.gulp.task('scripts:dev', () => {
    return $.gulp.src('src/static/js/single-portfolio.js')
          .pipe($.plag.plumber())
          .pipe($.plag.plumber.stop())
          .pipe($.plag.concat('main.js'))
          .pipe($.gulp.dest('build/static/js'))
          .pipe($.bs.reload({
            stream: true
          }))
  })

  $.gulp.task('scripts:modules', () => {
    return $.gulp.src('src/static/js/modules/*.js')
            .pipe($.plag.plumber())
            .pipe($.plag.plumber.stop())
            .pipe($.uglifyEs())
            .pipe($.plag.rename({
              extname: '.min.js'
            }))
            .pipe($.gulp.dest('build/static/js/modules'))
            .pipe($.bs.reload({
              stream: true
            }))
  })

  $.gulp.task('scripts:build', () => {
      return $.gulp.src('src/static/js/*.js')
      .pipe($.plag.plumber())
      .pipe($.plag.plumber.stop())
      .pipe($.uglifyEs())
      .pipe($.plag.rename({
        extname: '.min.js'
      }))
      .pipe($.gulp.dest('build/static/js'))
      .pipe($.bs.reload({
        stream: true
      }))
  })

  $.gulp.task('scripts-lib', () => {
    return $.gulp.src(['node_modules/jquery/dist/jquery.min.js',
      'node_modules/slick-carousel/slick/slick.min.js'])
      .pipe($.gulp.dest('build/static/libs/js'))
      .pipe($.bs.reload({
        stream: true
      }))
  })

}