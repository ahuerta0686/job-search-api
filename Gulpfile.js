const gulp    = require('gulp'),
      nodemon = require('gulp-nodemon');

gulp.task('default', ['watch']);

gulp.task('watch', function () {
  nodemon({
    script: 'app/app.js',
    ext: 'js',
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('build', function () {

});
