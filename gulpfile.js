let gulp        = require('gulp');
let del         = require('del');
let browserSync = require('browser-sync').create();
let sass        = require('gulp-sass');
let babel       = require('gulp-babel');
let uglify      = require('gulp-uglify');
let htmlmin     = require('gulp-htmlmin');
let runsequence = require("run-sequence");
let webpack     = require('gulp-webpack');
let concat      = require('gulp-concat');
let webpackConf = require('./webpack.config.js');
let reload      = browserSync.reload;

let src = {
    scss: 'src/scss/*.scss',
    css:  'desc/css',
    html: 'src/index.html',
    scripts: 'src/scripts/*.jsx',
    jsxscripts: 'src/scripts/*/*.jsx'
};

gulp.task('serve', ['buildScripts', 'buildExternalScripts', 'buildHtml', 'buildSass'], () => {

    browserSync.init({
        server: {
            baseDir: './desc',
            index: 'index.html'
        }
    });

    gulp.watch(src.scss, ['buildSass']);
    gulp.watch(src.html, ['buildHtml']);
    gulp.watch(src.scripts, ['buildScripts']);
    gulp.watch(src.jsxscripts, ['buildScripts']);
});

gulp.task('preBuild', () => {
    del(['dist']);
});

gulp.task('buildHtml', () => {
    gulp.src(['src/index.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('desc'))
        .pipe(reload({stream: true}));
});

gulp.task('buildScripts', () => {
    gulp.src(['src/scripts/reactscript.jsx'])
        .pipe(webpack( webpackConf ))
        .pipe(uglify())
        .pipe(gulp.dest('desc/scripts'))
        .pipe(reload({stream: true}));
});

gulp.task('buildExternalScripts', () => {
    gulp.src([
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('desc/scripts'));
});

gulp.task('buildSass', () => {
    gulp.src(src.scss)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['preBuild', 'serve']);