/**
 * Tests if the `unsetRequired` method works as expected
 */
var core = core || {};

core.unsetRequiredSpec = function() {
    beforeEach( function() {
        this.input = helper.bareInput();
        this.spyTheme = helper.createSpyTheme();
        this.instance = new LiveValidator( $, this.input, { theme: this.spyTheme } );
        this.unmarkRequired = spyOn( this.spyTheme.prototype, 'unmarkRequired' );
        this.unsetMissing = spyOn( this.spyTheme.prototype, 'unsetMissing' );
    } );

    it( 'without input', function() {
        this.instance.unsetRequired();

        expect( this.unmarkRequired ).toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.instance.options.required ).toBe( false );
    } );
};
