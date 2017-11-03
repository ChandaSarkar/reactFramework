var gulp        = require('gulp');
var del = require("del");
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var runsequence = require("run-sequence");
var reload      = browserSync.reload;

var src = {
    scss: 'src/scss/*.scss',
    css:  'desc/css',
    html: 'src/index.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['buildHtml', 'sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./desc",
            index: "index.html"
        }
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', function() {
        runsequence("buildHtml", reload);
    });

    /*gulp.src(['src/index.html'])
    .pipe(gulp.dest("desc"));*/
});

gulp.task("preBuild", function() {
    console.log("running pre build");

    return del(["dist"]);
});

gulp.task("buildHtml", function() {
    gulp.src(['src/index.html'])
    .pipe(gulp.dest("desc"));
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['preBuild', 'serve']);