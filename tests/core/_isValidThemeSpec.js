/**
 * Tests to check that `_isValidTheme` works as is required
 */
var core = core || {};

core._isValidThemeSpec = function() {
    beforeEach( function() {
        this.instance = new LiveValidator( $, helper.bareInput() );

        this.theme = function testTheme() {};
        this.theme.prototype.markRequired = function() {};
        this.theme.prototype.unmarkRequired = function() {};
        this.theme.prototype.unsetMissing = function() {};
        this.theme.prototype.setMissing = function() {};
        this.theme.prototype.clearErrors = function() {};
        this.theme.prototype.addErrors = function() {};
    } );

    it( 'for a valid theme', function() {
        expect( this.instance._isValidTheme( this.theme ) ).toBe( true );
    } );

    it( 'for an invalid theme', function() {

        // Make the theme invalid
        delete this.theme.prototype.markRequired;

        expect( this.instance._isValidTheme( this.theme ) ).toBe( false );
    } );

    it( 'for an non-object theme', function() {
        var theme = 'The theme';

        expect( this.instance._isValidTheme( theme ) ).toBe( false );
    } );
};
