/**
 * Tests if the `unsetRequired` method works as expected
 */
var core = core || {};

core.unsetRequiredSpec = function() {
    beforeEach( function() {
        setFixtures( '<input />' );
        this.input = $( 'input' );
        this.spyTheme = helper.createSpyTheme();
        this.instance = LiveValidator( $, this.input, { theme: this.spyTheme } );
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
