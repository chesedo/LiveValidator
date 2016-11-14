/**
 * Tests if the `disableLive` method works as expected
 */
var core = core || {};

core.disableLiveSpec = function() {
    beforeEach( function() {
        this.input = helper.bareInput();
        this.input.value = 'input';
        this.instance = new LiveValidator.Core( this.input );
        this._performChecks = spyOn( LiveValidator.Core.prototype, '_performChecks' );
    } );

    it( 'without input', function() {
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).toHaveBeenCalledTimes( 1 );
        this.instance.disableLive();
        expect( this._performChecks ).toHaveBeenCalledTimes( 1 );
        expect( this.instance.liveEnabled ).toBe( false );
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).toHaveBeenCalledTimes( 1 );
    } );
};
