var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    paths = require('../paths'),
    jspm = require('jspm'),
    fs = require('fs');


// gulp.task('deploy', function(callback) {
//   return runSequence(
//     'clean',
//     ['build-system', 'build-html'],
//     callback
//   );
// });

/**
 * Bundle aurelia-framework
 */
gulp.task('deploy-bundle', function(done) {
  var distFile = 'app.js';
  var outputFile = paths.deploy + distFile;

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
