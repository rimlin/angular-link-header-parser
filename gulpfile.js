var gulp    = require("gulp"),
    del     = require("del"),
    plugins = require("gulp-load-plugins")();

var paths = require("./gulp.config.json");

var log    = plugins.util.log,
    colors = plugins.util.colors;

gulp.task("help", plugins.taskListing);

gulp.task("clean", function (callback) {
  log("Cleaning: " + colors.blue(paths.release));

  del(paths.release, callback);
});

gulp.task("build-min", function () {
  log("Minifying and copying angular module to release folder: " + colors.blue(paths.release));

  return gulp
    .src(paths.source)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.bytediff.start())
    .pipe(plugins.uglify())
    .pipe(plugins.bytediff.stop(bytediffFormatter))
    .pipe(plugins.rename({ extname: ".min.js" }))
    .pipe(gulp.dest(paths.release));
});

gulp.task("copy-module", function () {
  log("Copying angular module to release folder: " + colors.blue(paths.release));

  return gulp
    .src(paths.source)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.rename({ extname: ".js" }))
    .pipe(gulp.dest(paths.release));
});

gulp.task("build", [ "build-min", "copy-module" ], function () {});

/////////////////////////////////////////////////////////////////////////////////////////////

function bytediffFormatter(data) {
  var difference = (data.savings > 0) ? " smaller." : " larger.";

  return data.fileName
    + " went from "
    + colors.yellow((data.startSize / 1000).toFixed(2) + " kB")
    + " to "
    + colors.yellow((data.endSize / 1000).toFixed(2) + " kB")
    + " and is "
    + colors.yellow(formatPercent(1 - data.percent, 2) + "%")
    + difference;
}

function formatPercent(num, precision) {
  return (num * 100).toFixed(precision);
}
