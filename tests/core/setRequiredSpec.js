/**
 * Tests if the `setRequired` method works as expected
 */
var core = core || {};

core.setRequiredSpec = function() {
    beforeEach( function() {
        var input = helper.bareInput(),
            spyTheme = helper.createSpyTheme();

        this.instance = new LiveValidator.Core( $, input, { theme: spyTheme } );
        this._blur = spyOn( LiveValidator.Core.prototype, '_blur' );
        this.markRequired = spyOn( spyTheme.prototype, 'markRequired' );
    } );

    it( 'without input', function() {
        this.instance.setRequired();

        expect( this.markRequired ).toHaveBeenCalled();
        expect( this.instance.options.required ).toBe( true );
        expect( this._blur ).not.toHaveBeenCalled();
    } );

    it( 'with true input', function() {
        this.instance.setRequired( true );

        expect( this.markRequired ).toHaveBeenCalled();
        expect( this.instance.options.required ).toBe( true );
        expect( this._blur ).toHaveBeenCalled();
    } );

    it( 'with false input', function() {
        this.instance.setRequired( false );

        expect( this.markRequired ).toHaveBeenCalled();
        expect( this.instance.options.required ).toBe( true );
        expect( this._blur ).not.toHaveBeenCalled();
    } );
};
