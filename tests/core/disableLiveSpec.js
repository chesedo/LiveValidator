/**
 * Tests if the `disableLive` method works as expected
 */
var core = core || {};

core.disableLiveSpec = function() {
    beforeEach( function() {
        this.input = helper.bareInput().val( 'value' );
        this.instance = new LiveValidator( $, this.input );
        this._performChecks = spyOn( LiveValidator.prototype, '_performChecks' );
    } );

    it( 'without input', function() {
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).toHaveBeenCalledTimes( 1 );
        this.instance.disableLive();
        expect( this._performChecks ).toHaveBeenCalledTimes( 1 );
        expect( this.instance.liveEnabled ).toBe( false );
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).toHaveBeenCalledTimes( 1 );
    } );
};
