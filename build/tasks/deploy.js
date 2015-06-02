var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    paths = require('../paths'),
    jspm = require('jspm'),
    fs = require('fs'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    merge = require('merge-stream');

gulp.task('deploy', function(callback) {
  return runSequence(
    'deploy-clean',
    'clean',
    ['build-system', 'build-html'],
    'deploy-bundle',
    'deploy-copy',
    'deploy-unbundle',
    callback
  );
});

gulp.task('deploy-clean', function() {
  return gulp.src([paths.deploy])
    .pipe(vinylPaths(del));
});

/**
 * Bundle aurelia-framework
 */
gulp.task('deploy-bundle', function(done) {
  var distFile = 'app.js';
  var outputFile = paths.deploy + distFile;
  if (!fs.existsSync(paths.deploy))
    fs.mkdirSync(paths.deploy);

  var cmd = [
    '*',
    'aurelia-bootstrapper',
    'aurelia-http-client',
    'aurelia-dependency-injection',
    'aurelia-framework',
    'aurelia-router',
  ].join(' + ');

  jspm.bundle(cmd, distFile, {
    inject: true,
    minify: true
  }).then(function() {
    fs.rename(distFile, outputFile, function() {
      done();
    });
  });
});

gulp.task('deploy-copy', function() {
  var baseFiles = gulp.src(['index.html', 'config.js'])
    .pipe(gulp.dest(paths.deploy));

  var jspmPackages = gulp.src(['jspm_packages/**/*'])
    .pipe(gulp.dest(paths.deploy + 'jspm_packages'));

  var styles = gulp.src(['styles/**/*'])
    .pipe(gulp.dest(paths.deploy + 'styles'));

  return merge(baseFiles, jspmPackages, styles);
});

gulp.task('deploy-unbundle', function() {
  return jspm.unbundle();
});
