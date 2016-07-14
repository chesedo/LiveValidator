var gulp = require( 'gulp' ),
    karmaServer = require( 'karma' ).Server,
    jscs = require( 'gulp-jscs' ),
    jshint = require( 'gulp-jshint' ),
    stylish = require( 'gulp-jscs-stylish' ),
    path = require( 'path' ),
    rename = require( 'gulp-rename' ),
    less = require( 'gulp-less' ),
    cleanCSS = require( 'gulp-clean-css' );

/* jshint undef: false */
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
            .pipe( jshint( '.jshintrc' ) )
            .pipe( jscs( { configPath: '.jscsrc' } ) )
            .pipe( stylish.combineWithHintResults() )
            .pipe( jshint.reporter( 'jshint-stylish' ) )
            .pipe( jscs.reporter( 'fail' ) )
            .pipe( jshint.reporter( 'fail' ) );
} );

gulp.task( 'dist-css', function() {
    return gulp.src( 'src/less/*.less' )
            .pipe( less() )
            .pipe( gulp.dest( 'dist/css' ) )
            .pipe( cleanCSS() )
            .pipe( rename( { suffix: '.min' } ) )
            .pipe( gulp.dest( 'dist/css' ) );
} );

gulp.task( 'default', [ 'code-test', 'code-standards' ] );
