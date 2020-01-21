const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const watch = require('gulp-watch');
const sass=require('gulp-sass');

//Gulpt Task for SCSS-compile (. - is divider of lines)
gulp.task("scss", function() {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css/"))
        .pipe(browserSync.stream());
});

//Gulp Task for start local server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task("watch", function() {
    watch(
        ["./src/*.html", "./src/*.js", "./src/img/*.*"],
        gulp.parallel(browserSync.reload)
    );
    watch("./src/scss/**/*.scss", function() {
        setTimeout(gulp.parallel("scss"), 1000);
    });
});

gulp.task("default", gulp.series("scss", gulp.parallel("server", "watch")));

//Create first Gulp Task (run as 'gulp hello')

// gulp.task('hello', function (callback) {
//     console.log("Hello from Gulp!");
//     callback();
// });

// gulp.task('bye', function (callback) {
//     console.log("Goodbye from Gulp!");
//     callback();
// });

//Default Gulp Task (run as 'gulp')
// gulp.task('default', function(callback) {
//     console.log("Default gulp task");
//     callback();
// })

//последовательное выполнение задач
// gulp.task('default', gulp.series('hello', 'bye') );

//Параллельное выполнение задач
// gulp.task('default', gulp.parallel('hello', 'bye') );
