/* Для установки какого-либо пакет или плагин требуется рассмотреть документацию  */
/* Для того, чтобы сказать, что gulp должен использовать тот или иной пакет, требуется импортировать кусочки пакетов внутрб этого файла  */
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');  
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
/* Здесь указываются конкретные пакеты, которые мы установили */

// Static server
gulp.task('server', function() { /* gulp.task - это по своей сути обращение, sercer-название задачи, function -базовая настройка */
    browserSync({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload)
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") 
    /* Указывает то, что будет возвращать gulp по определенному адресу, здесь, в частности, файл стилей sass */
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* Далее скомпилировали их при помощи sass */
            .pipe(rename({prefix: "",suffix: ".min",}))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css")) /* После этого уже полученные файлы положили в указанную папку по определенному адресу*/
            .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
})

gulp.task('default',gulp.parallel('watch','server','styles'))
