/**
 * Tests if the `destroy` works as expected
 */
var core = core || {};

core.destroySpec = function() {
    beforeEach( function() {
        var spyTheme = helper.createSpyTheme();
        this.input = helper.bareInput();
        this.input.value = 'value';
        this.instance = new LiveValidator.Core( this.input, { theme: spyTheme } );

        this.unsetMissing = spyOn( spyTheme.prototype, 'unsetMissing' );
        this.clearErrors = spyOn( spyTheme.prototype, 'clearErrors' );
        this._performChecks = spyOn( LiveValidator.Core.prototype, '_performChecks' );
    } );

    it( 'without input', function() {
        this.input.dispatchEvent( helper.inputEvent );
        this.input.dispatchEvent( helper.blurEvent );
        expect( this.unsetMissing ).toHaveBeenCalledTimes( 1 );
        expect( this.clearErrors ).not.toHaveBeenCalled(); // Spy is preventing this call
        expect( this._performChecks ).toHaveBeenCalledTimes( 2 );

        this.instance.destroy();
        this.input.dispatchEvent( helper.inputEvent );
        this.input.dispatchEvent( helper.blurEvent );
        expect( this.unsetMissing ).toHaveBeenCalledTimes( 2 );
        expect( this.clearErrors ).toHaveBeenCalledTimes( 1 );
        expect( this._performChecks ).toHaveBeenCalledTimes( 2 );
    } );
};
