var gulp = require( 'gulp' ),
    karmaServer = require( 'karma' ).Server,
    jscs = require( 'gulp-jscs' ),
    jshint = require( 'gulp-jshint' ),
    stylish = require( 'gulp-jscs-stylish' ),
    path = require( 'path' );

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


gulp.task( 'default', [ 'code-test', 'code-standards' ] );
