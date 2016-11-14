/**
 * Tests if the `unsetRequired` method works as expected
 */
var core = core || {};

core.unsetRequiredSpec = function() {
    beforeEach( function() {
        var input = helper.bareInput(),
            spyTheme = helper.createSpyTheme();

        this.instance = new LiveValidator.Core( input, { theme: spyTheme } );
        this.unmarkRequired = spyOn( spyTheme.prototype, 'unmarkRequired' );
        this.unsetMissing = spyOn( spyTheme.prototype, 'unsetMissing' );
    } );

    it( 'without input', function() {
        this.instance.unsetRequired();

        expect( this.unmarkRequired ).toHaveBeenCalled();
        expect( this.unsetMissing ).toHaveBeenCalled();
        expect( this.instance.options.required ).toBe( false );
    } );
};
