/**
 * Tests if the `unsetRequired` method works as expected
 */
var core = core || {};

core.unsetRequiredSpec = function() {
    beforeEach( function() {
        setFixtures( '<input />' );
        this.input = $( 'input' );
        this.instance = LiveValidator( $, this.input );
        this.unmarkRequired = spyOn( LiveValidatorTheme.prototype, 'unmarkRequired' );
        this.unsetMissing = spyOn( LiveValidatorTheme.prototype, 'unsetMissing' );
    } );

    it( 'without input', function() {
        this.instance.unsetRequired();

        expect( this.unmarkRequired ).toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.instance.options.required ).toBe( false );
    } );
};
