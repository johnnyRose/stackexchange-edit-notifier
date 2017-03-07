var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var pump = require('pump-promise');
var runSequence = require('run-sequence');

gulp.task('default', function (done) {
    runSequence('concat', 'uglify', done);
});

gulp.task('concat', function (done) {
    
    pump([
        gulp.src([
            'node_modules/angular/angular.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/ui-select/dist/select.js',
            'web/content/src/js/app/controllers/mainController.js',
            'web/content/src/js/app/services/mainService.js',            
        ]),
        concat('all.js'),
        gulp.dest('web/content/build/js')
    ]).then(function () {
        pump([
            gulp.src([
                'node_modules/reset-css/reset.css',
                'node_modules/milligram/dist/milligram.css',
                'web/content/src/css/roboto-font.css',
                'node_modules/ui-select/dist/select.css',
                'web/content/src/css/main.css',
            ]),
            concat('all.css'),
            gulp.dest('web/content/build/css')
        ]).then(done);
    });
    
});

gulp.task('uglify', function (done) {
    
    pump([
        gulp.src('web/content/build/js/all.js'),
        uglify(),
        gulp.dest('web/content/dist/js')
    ]).then(function () {
        pump([
            gulp.src('web/content/build/css/all.css'),
            uglifycss(),
            gulp.dest('web/content/dist/css')
        ]).then(function () {
            pump([
                gulp.src('web/content/src/images/*'),
                gulp.dest('web/content/dist/images')
            ]).then(done);
        });
    });
    
});
