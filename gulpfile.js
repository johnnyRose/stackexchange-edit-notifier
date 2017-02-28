var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var pump = require('pump');
 
gulp.task('build', function () {
    pump([
        gulp.src([
            'node_modules/jquery/dist/jquery.js', 
            'node_modules/select2/dist/js/select2.js',
            'web/content/src/js/main.js',
        ]),
        concat('all.js'),
        gulp.dest('web/content/build/js')
    ]);
    
    pump([
        gulp.src([
            'node_modules/milligram/dist/milligram.css',
            'web/content/src/css/roboto-font.css',
            'node_modules/select2/dist/css/select2.css',
            'web/content/src/css/main.css',
        ]),
        concat('all.css'),
        gulp.dest('web/content/build/css')
    ]);
    
    pump([
        gulp.src('web/content/build/js/all.js'),
        uglify(),
        gulp.dest('web/content/dist/js')
    ]);
    
    pump([
        gulp.src('web/content/build/css/all.css'),
        uglifycss(),
        gulp.dest('web/content/dist/css')
    ]);
    
    pump([
       gulp.src('web/content/src/images/*'),
       gulp.dest('web/content/dist/images')
    ]);
});
