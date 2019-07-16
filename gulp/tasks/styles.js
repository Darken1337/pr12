module.exports = function() {
  $.gulp.task('styles:build', () => {
    return $.gulp.src('src/static/sass/pages/*.sass')
      .pipe($.plag.plumber())
      .pipe($.plag.sourcemaps.init())
      .pipe($.plag.sass())
      .pipe($.plag.autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
      }))
      .on("error", $.plag.notify.onError({
        message: "Error: <%= error.message %>",
        title: "style"
      }))
      .pipe($.plag.csso())
      .pipe($.plag.rename({
        extname: '.min.css'
      }))
      .pipe($.plag.sourcemaps.write())
      .pipe($.plag.plumber.stop())
      .pipe($.gulp.dest('build/static/css'))
      .pipe($.bs.reload({
        stream: true
      }));
  })

  $.gulp.task('styles:base', () => {
    return $.gulp.src('src/static/sass/main.sass')
      .pipe($.plag.plumber())
      .pipe($.plag.sass())
      .pipe($.plag.autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
      }))
      .on("error", $.plag.notify.onError({
        message: "Error: <%= error.message %>",
        title: "style"
      }))
      .pipe($.plag.plumber.stop())
      .pipe($.gulp.dest('build/static/css'))
      .pipe($.bs.reload({
        stream: true
      }));
  })

  $.gulp.task('styles:dev', () => {
    return $.gulp.src('src/static/sass/main.{sass,scss}')
      .pipe($.plag.plumber())
      .pipe($.plag.sass())
      .pipe($.plag.autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      }))
      .on("error", $.plag.notify.onError({
        message: "Error: <%= error.message %>",
        title: "style"
      }))
      .pipe($.plag.plumber.stop())
      .pipe($.gulp.dest('build/static/css'))
      .pipe($.bs.reload({
        stream: true
      }));
  })

  $.gulp.task('styles:libs', () => {
    return $.gulp.src('src/static/libs/*.css')
      .pipe($.plag.csso())
      .pipe($.plag.rename({
        extname: '.min.css'
      }))
      .pipe($.gulp.dest('build/static/libs/css'))
  })
}