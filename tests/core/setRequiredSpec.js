/**
 * Tests if the `setRequired` method works as expected
 */
var core = core || {};

core.setRequiredSpec = function() {
    beforeEach( function() {
        setFixtures( '<input />' );
        this.input = $( 'input' );
        this.instance = LiveValidator( $, this.input );
        this._blur = spyOn( LiveValidator.prototype, '_blur' );
        this.markRequired = spyOn( LiveValidatorTheme.prototype, 'markRequired' );
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
