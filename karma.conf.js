// Karma configuration
// Generated on Thu Jun 30 2016 12:34:29 GMT+0200 (SAST)

/* globals module */
module.exports = function( config ) {
    config.set( {

        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jasmine-jquery', 'jasmine' ],

        // List of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.js',
            'node_modules/bootstrap/js/tooltip.js',
            'node_modules/bootstrap/js/popover.js',
            'node_modules/uikit/dist/js/uikit.js',
            'node_modules/uikit/dist/js/components/tooltip.js',
            'src/js/**/*.js',
            'tests/**/*.js'
        ],

        // List of files to exclude
        exclude: [
        ],

        // Preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/js/**/*.js': [ 'coverage' ]
        },

        // Test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'spec', 'coverage' ],

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'PhantomJS' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // Settings for coverage reporter
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcov', subdir: 'lcov' }
            ]
        }
    } );
};
