/**
 * Tests if the `enableLive` method works as expected
 */
var core = core || {};

core.enableLiveSpec = function() {
    beforeEach( function() {
        this.input = helper.bareInput();
        this.instance = LiveValidator( $, this.input, { liveEnabled: false } );
        this._performChecks = spyOn( LiveValidator.prototype, '_performChecks' );
    } );

    it( 'without input', function() {
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'with true input', function() {
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive( true );
        expect( this._performChecks ).toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'with false input', function() {
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive( false );
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.trigger( 'input.LiveValidator' );
        expect( this._performChecks ).toHaveBeenCalled();
    } );
};
