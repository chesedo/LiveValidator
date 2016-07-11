/**
 * Tests if the `_blur` works as expected
 */
var core = core || {};

core._blurSpec = function() {
    beforeEach( function() {
        this.input = helper.bareInput();
        this.inputRequired = helper.requiredInput();

        this.spyTheme = helper.createSpyTheme();

        this.instance = LiveValidator( $, this.input, { theme: this.spyTheme } );
        this.instanceRequired = LiveValidator( $, this.inputRequired, { theme: this.spyTheme } );

        $( this.input ).blur( this.instance._blur.bind( this.instance ) );
        $( this.inputRequired ).blur( this.instanceRequired._blur.bind( this.instanceRequired ) );

        this.setMissing = spyOn( this.spyTheme.prototype, 'setMissing' );
        this.unsetMissing = spyOn( this.spyTheme.prototype, 'unsetMissing' );
        this._performChecks = spyOn( LiveValidator.prototype, '_performChecks' );
    } );

    it( 'empty and not required', function() {
        $( this.input ).blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
    } );

    it( 'empty and required', function() {
        $( this.inputRequired ).blur();
        expect( this.setMissing ).toHaveBeenCalled();
        expect( this.unsetMissing ).not.toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
    } );

    it( 'not empty and not required', function() {
        $( this.input ).val( 'test' ).blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'not empty and required', function() {
        $( this.inputRequired ).val( 'test' ).blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this._performChecks ).toHaveBeenCalled();
    } );

    it( 'filled with spaces and not required', function() {
        $( this.input ).val( ' ' ).blur();
        expect( this.setMissing ).not.toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
    } );

    it( 'filled with spaces and required', function() {
        $( this.inputRequired ).val( ' ' ).blur();
        expect( this.setMissing ).toHaveBeenCalled();
        expect( this.unsetMissing ).not.toHaveBeenCalled();
        expect( this._performChecks ).not.toHaveBeenCalled();
    } );
};
