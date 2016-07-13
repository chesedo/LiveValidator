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
        return LiveValidator( $, helper.bareInput(), options );
    }

    it( 'false', function() {
        var instance = setupInstance( { debug: false } );

        expect( this.log ).not.toHaveBeenCalled();
    } );

    it( 'true', function() {
        var instance = setupInstance( { debug: true } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^(DEBUG|INFO|ERROR):/ ) );
        } );
    } );

    it( 'level 1', function() {
        var instance = setupInstance( { debug: 1 } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^DEBUG:/ ) );
        } );
    } );

    it( 'level 2', function() {
        var instance = setupInstance( { debug: 2 } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^(DEBUG|INFO):/ ) );
        } );
    } );

    it( 'level 3', function() {
        var instance = setupInstance( { debug: 3 } );

        expect( this.log ).toHaveBeenCalled();
        this.log.calls.allArgs().forEach( function( args ) {
            expect( args ).toEqual( jasmine.stringMatching( /^(DEBUG|INFO|ERROR):/ ) );
        } );
    } );
};
