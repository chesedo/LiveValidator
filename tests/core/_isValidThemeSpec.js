/**
 * Tests to check that `_isValidTheme` works as is required
 */
var core = core || {};

core._isValidThemeSpec = function() {
    beforeEach( function() {
        this.theme = function testTheme() {};
        this.theme.prototype.markRequired = function() {};
        this.theme.prototype.unmarkRequired = function() {};
        this.theme.prototype.unsetMissing = function() {};
        this.theme.prototype.setMissing = function() {};
    } );

    it( 'for a valid theme', function() {
        var instance = new LiveValidator( $, helper.bareInput(), { theme: this.theme } );

        expect( instance.theme.constructor.name ).toEqual( 'testTheme' );
    } );

    it( 'for an invalid theme', function() {

        // Make the theme invalid
        delete this.theme.prototype.markRequired;

        var instance = new LiveValidator( $, helper.bareInput(), { theme: this.theme } );

        expect( instance.theme.constructor.name ).toEqual( 'LiveValidatorTheme' );
    } );
};
