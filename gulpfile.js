var gulp = require( 'gulp' ),
    karmaServer = require( 'karma' ).Server,
    jscs = require( 'gulp-jscs' );

gulp.task( 'code-test', function( done ) {
    return new karmaServer( {
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done ).start();
} );

gulp.task( 'tdd', function( done ) {
    return new karmaServer( {
        configFile: __dirname + '/karma.conf.js',
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
            .pipe( jscs( { configPath: '.jscsrc' } ) )
            .pipe( jscs.reporter() );
} );

gulp.task( 'default', [ 'code-test', 'code-standards' ] );
