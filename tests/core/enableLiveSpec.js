/**
 * Tests if the `enableLive` method works as expected
 */
var core = core || {};

core.enableLiveSpec = function() {
    beforeEach( function() {
        this.input = helper.bareInput();
        this.input.value = 'value';
        this.instance = new LiveValidator.Core( this.input, { liveEnabled: false } );
        this._performChecks = spyOn( LiveValidator.Core.prototype, '_performChecks' );
    } );

    it( 'without input', function() {
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'with true input', function() {
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive( true );
        expect( this._performChecks ).toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'with false input', function() {
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive( false );
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'when input is empty', function() {
        this.input.value = '';
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).not.toHaveBeenCalled();
        this.instance.enableLive();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( this.instance.liveEnabled ).toBe( true );
        this.input.dispatchEvent( helper.inputEvent );
        expect( this._performChecks ).not.toHaveBeenCalled();
    } );
};
