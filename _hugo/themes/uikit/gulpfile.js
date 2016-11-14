var gulp = require( 'gulp' ),
    less = require( 'gulp-less' ),
    concat = require( 'gulp-concat' ),
    rename = require( 'gulp-rename' ),
    del = require( 'del' ),
    uglify = require( 'gulp-uglify' ),
    cleanCSS = require( 'gulp-clean-css' );

var uikitLess = 'assets/less/uikit.less';
var uikitJS =  [
            'assets/bower_components/uikit/js/core/core.js',
            'assets/bower_components/uikit/js/core/dropdown.js',
            'assets/bower_components/uikit/js/core/offcanvas.js',
            'assets/bower_components/uikit/js/core/tab.js',
            'assets/bower_components/uikit/js/core/scrollspy.js',
            'assets/bower_components/uikit/js/core/smooth-scroll.js',
            'assets/bower_components/uikit/js/core/switcher.js',
            'assets/bower_components/uikit/js/components/sticky.js'
        ];
var prismJS =  [
            'assets/bower_components/prism/components/prism-core.js',
            'assets/bower_components/prism/components/prism-markup.js',
            'assets/bower_components/prism/components/prism-clike.js',
            'assets/bower_components/prism/components/prism-javascript.js',
            'assets/bower_components/prism/components/prism-css.js',
        ];
var liveValidatorJS =  [
            'assets/bower_components/live-validator/dist/js/jquery-live-validator.min.js',
            'assets/bower_components/live-validator/dist/js/js-live-validator.min.js',
            'assets/bower_components/live-validator/dist/js/live-validator-theme-default.min.js'
        ];

function cssUikit() {
    return gulp.src( uikitLess )
            .pipe( less( {
                paths: './assets/bower_components/uikit/less'
            } ) )
            .pipe( cleanCSS() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'static/css' ) );
}

function fontsUikit() {
    return gulp.src( 'assets/bower_components/uikit/fonts/*' )
            .pipe( gulp.dest( 'static/fonts' ) );
}

function jsUikit() {
    return gulp.src( uikitJS )
            .pipe( uglify() )
            .pipe( concat( 'uikit.min.js' ) )
            .pipe( gulp.dest( 'static/js' ) );
}

function cssPrism() {
    return gulp.src( [ 'assets/bower_components/prism/themes/prism.css' ] )
            .pipe( cleanCSS() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'static/css' ) );
}

function jsPrism() {
    return gulp.src( prismJS )
            .pipe( uglify() )
            .pipe( concat( 'prism.min.js' ) )
            .pipe( gulp.dest( 'static/js' ) );

}

function cssLiveValidator() {
    return gulp.src( [ 'assets/bower_components/live-validator/dist/css/LiveValidatorTheme.css' ] )
            .pipe( cleanCSS() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'static/css' ) );
}

function jsLiveValidator() {
    return gulp.src( liveValidatorJS )
        .pipe( gulp.dest( 'static/js' ) );
}

function clean() {
    del( 'static/*' );
}

gulp.task( 'css-uikit', cssUikit );
gulp.task( 'fonts-uikit', fontsUikit );
gulp.task( 'js-uikit', jsUikit );

gulp.task( 'css-prism', cssPrism );
gulp.task( 'js-prism', jsPrism );

gulp.task( 'css-live-validator', cssLiveValidator );
gulp.task( 'js-live-validator', jsLiveValidator );

gulp.task( 'clean', clean );

gulp.task( 'default', [ 'clean' ], function() {
    cssUikit();
    jsUikit();
    fontsUikit();

    cssPrism();
    jsPrism();

    cssLiveValidator();
    jsLiveValidator();
} );

gulp.task( 'watch', function() {
    gulp.watch( [ 'assets/less/uikit.less', 'assets/less/theme.less', 'assets/less/uikit/*.less' ], [ 'css-uikit' ] );
} );
