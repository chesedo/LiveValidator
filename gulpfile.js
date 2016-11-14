var gulp = require( 'gulp' ),
    karmaServer = require( 'karma' ).Server,
    jscs = require( 'gulp-jscs' ),
    jshint = require( 'gulp-jshint' ),
    stylish = require( 'gulp-jscs-stylish' ),
    path = require( 'path' ),
    rename = require( 'gulp-rename' ),
    del = require( 'del' ),
    less = require( 'gulp-less' ),
    cleanCSS = require( 'gulp-clean-css' ),
    concat = require( 'gulp-concat' ),
    uglify = require( 'gulp-uglify' );

/* jshint undef: false */
function distCss() {
    return gulp.src( 'src/less/*.less' )
            .pipe( less() )
            .pipe( gulp.dest( 'dist/css' ) )
            .pipe( cleanCSS() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'dist/css' ) );
}

function distJqPlugin() {
    return gulp.src( [
        'src/js/plugin/*.js',
        'src/js/core/*.js',
        'src/js/autoChecks/*.js',
        'src/js/tester/*.js',
        'src/js/utils/*.js'
    ] )
            .pipe( concat( 'jquery-live-validator.js' ) )
            .pipe( gulp.dest( 'dist/js' ) )
            .pipe( uglify() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'dist/js' ) );
}

function distJsPlugin() {
    return gulp.src( [
        'src/js/core/*.js',
        'src/js/autoChecks/*.js',
        'src/js/tester/*.js',
        'src/js/utils/*.js'
    ] )
            .pipe( concat( 'js-live-validator.js' ) )
            .pipe( gulp.dest( 'dist/js' ) )
            .pipe( uglify() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'dist/js' ) );
}

function distJsThemes() {
    return gulp.src( 'src/js/themes/*.js' )
            .pipe( rename( function( path ) {
                path.basename = 'live-validator-theme-' + path.basename.toLowerCase();
            } ) )
            .pipe( gulp.dest( 'dist/js' ) )
            .pipe( uglify() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'dist/js' ) );
}

gulp.task( 'code-test', function( done ) {
    return new karmaServer( {
        configFile: path.join( __dirname, '/karma.conf.js' ),
        singleRun: true
    }, done ).start();
} );

gulp.task( 'tdd', function( done ) {
    return new karmaServer( {
        configFile: path.join( __dirname, '/karma.conf.js' ),
        autoWatch: true,
        reporters: [ 'spec', 'notify' ],
        specReporter: {
            maxLogLines: 2,
            suppressErrorSummary: true,
            suppressFailed: false,
            suppressPassed: true,
            suppressSkipped: true,
            showSpecTiming: false
        },
        notifyReporter: {
            reportEachFailure: false,
            reportSuccess: true
        }
    }, done ).start();
} );

gulp.task( 'code-standards', function() {
    return gulp.src( [ 'src/js/**/*.js', 'tests/**/*.js', '*.js' ] )
            .pipe( jshint() )
            .pipe( jscs( { configPath: '.jscsrc' } ) )
            .pipe( stylish.combineWithHintResults() )
            .pipe( jshint.reporter( 'jshint-stylish' ) )
            .pipe( jscs.reporter( 'fail' ) )
            .pipe( jshint.reporter( 'fail' ) );
} );

gulp.task( 'dist-css', distCss );

gulp.task( 'dist-jq-plugin', distJqPlugin );

gulp.task( 'dist-js-plugin', distJsPlugin );

gulp.task( 'dist-js-themes', distJsThemes );

gulp.task( 'dist', [ 'default' ], function() {
    del( [ 'dist/' ] ).then( function() {
        distCss();
        distJqPlugin();
        distJsPlugin();
        distJsThemes();
    } );
} );

gulp.task( 'default', [ 'code-test', 'code-standards' ] );
