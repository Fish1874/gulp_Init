const gulp = require("gulp");
const babel = require("gulp-babel");
const htmlmin = require('gulp-htmlmin');
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');  // 浏览器厂商前缀

const del = require("del")




function htmlTask() {
    return gulp.src("./src/views/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("dist/views"))
}

function sassTask() {
    return gulp.src("./src/sass/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix:'.min'}))    
    .pipe(gulp.dest("dist/css"))

}

function jsTask() {
    return gulp.src("./src/scripts/*.js")
    .pipe(babel({ presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("dist/js"))

}


gulp.watch(["./src/views/*.html"], htmlTask);
gulp.watch(["./src/sass/*.scss"], sassTask);
gulp.watch(["./src/scripts/*.js"], jsTask);



function clean() {
    // return del(["./dist"])
    return del(["./dist"]).then(() => {
        console.log('项目初始化清理完成...')
    })
}

exports.default = gulp.series(clean, htmlTask, sassTask, jsTask)