const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpPug = require('gulp-pug');

function html() {
  return gulp
    .src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src([
      './src/fonts/fonts.css',
      './src/styles/variables.css',
      './src/styles/globals.css',
      './src/styles/style.css',
      './src/styles/animations.css',
    ],{ allowEmpty: true })
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src(
      'src/images/**/*.{jpg,png,gif,ico,webp,avif}', { encoding: false }
    )
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

function svg() {
  return gulp.src('src/svg/**/*.svg')
  .pipe(gulp.dest('dist/svg'))
  .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp
    .src('src/fonts/**/*.{woff,woff2}', { encoding: false })
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del('dist');
}

const build = gulp.series(
  clean,
  gulp.parallel(pug, css, images, svg, fonts, scripts)
);

function watchFiles() {
  gulp.watch(['src/pages/**/*.pug'], pug);
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/svg/**/*.svg'], svg);
  gulp.watch(['src/fonts/**/*.{woff,woff2}'], fonts);
  gulp.watch(['src/scripts/**/*.js'], scripts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}

function pug() {
  return gulp
    .src('src/pages/**/*.pug')
    .pipe(gulpPug({pretty: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.clean = clean;
exports.fonts = fonts;
exports.scripts = scripts;
exports.build = build;
exports.watchapp = watchapp;
exports.pug = pug;
exports.default = watchapp;
