/**
 * Tests if the `_log` function works as expected
 */
var core = core || {};

core._logSpec = function() {
    beforeEach( function() {
        this.log = spyOn( console, 'log' );
    } );

    function setupInstance( options ) {
        options = options || {};
        return new LiveValidator.Core( $, helper.bareInput(), options );
    }

    it( 'false', function() {
        setupInstance( { debug: false } );

        expect( this.log ).not.toHaveBeenCalled();
    } );

    it( 'true', function() {
        setupInstance( { debug: true } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^(DEBUG|INFO|ERROR):/ ) );
        } );
    } );

    it( 'level 1', function() {
        setupInstance( { debug: 1 } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^DEBUG:/ ) );
        } );
    } );

    it( 'level 2', function() {
        setupInstance( { debug: 2 } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^(DEBUG|INFO):/ ) );
        } );
    } );

    it( 'level 3', function() {
        setupInstance( { debug: 3 } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^(DEBUG|INFO|ERROR):/ ) );
        } );
    } );
};
