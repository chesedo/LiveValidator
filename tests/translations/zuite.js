/**
 * The test suite for testing translations that should be complete
 */

var complete = [ 'af' ];

describe( 'Translations', function() {
    complete.forEach( function( locale ) {
        it( 'is ' + locale + ' complete', function() {
            var extend = LiveValidator.utils.extend(
                {},
                LiveValidator.translations[ 'en-us' ],
                LiveValidator.translations[ locale ]
            );
            expect( extend ).toEqual( LiveValidator.translations[ locale ] );
        } );
    } );
} );
