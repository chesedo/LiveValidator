/**
 * Tests if the `_blur` works as expected
 */
var core = core || {};

core._blurSpec = function() {
    beforeEach( function() {
        this.spyTheme = helper.createSpyTheme();

        this.setMissing = spyOn( this.spyTheme.prototype, 'setMissing' );
        this.unsetMissing = spyOn( this.spyTheme.prototype, 'unsetMissing' );
        this.clearErrors = spyOn( this.spyTheme.prototype, 'clearErrors' );
        this._performChecks = spyOn( LiveValidator.prototype, '_performChecks' );

        this.createInstance = function( required ) {
            this.input = helper.bareInput();

            return new LiveValidator( $, this.input, { theme: this.spyTheme, required: required } );
        };
    } );

    it( 'empty and not required', function() {
        var instance = this.createInstance( false );
        instance._blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( instance.missing ).toBe( false );
    } );

    it( 'empty and required', function() {
        var instance = this.createInstance( true );
        instance._blur();
        expect( this.setMissing ).toHaveBeenCalled();
        expect( this.unsetMissing ).not.toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( instance.missing ).toBe( true );
    } );

    it( 'not empty and not required', function() {
        var instance = this.createInstance( false );
        $( this.input ).val( 'test' );
        instance._blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.clearErrors ).not.toHaveBeenCalled();
        expect( this._performChecks ).toHaveBeenCalled();
        expect( instance.missing ).toBe( false );
    } );

    it( 'not empty and required', function() {
        var instance = this.createInstance( true );
        $( this.input ).val( 'test' );
        instance._blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.clearErrors ).not.toHaveBeenCalled();
        expect( this._performChecks ).toHaveBeenCalled();
        expect( instance.missing ).toBe( false );
    } );

    it( 'filled with spaces and not required', function() {
        var instance = this.createInstance( false );
        $( this.input ).val( ' ' );
        instance._blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( instance.missing ).toBe( false );
    } );

    it( 'filled with spaces and required', function() {
        var instance = this.createInstance( true );
        $( this.input ).val( ' ' );
        instance._blur();
        expect( this.setMissing ).toHaveBeenCalled();
        expect( this.unsetMissing ).not.toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
        expect( instance.missing ).toBe( true );
    } );
};
