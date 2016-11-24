/**
 * Tests that check the plugin creation
 */
var plugin = plugin || {};

plugin.creationSpec = function() {
    it( 'allows only the first instantiation', function() {
        var input = helper.bareInput();

        input.getLiveValidator();
        input.getLiveValidator( { required: true } );
        expect( input.LiveValidator.options.required ).toEqual( false );
    } );

    it( 'does not allow invalid array options', function() {
        var input = helper.bareInput();

        input.getLiveValidator( [ 'array' ] );
        expect( input.LiveValidator ).not.toBeDefined();
    } );

    it( 'does not allow invalid string options', function() {
        var input = helper.bareInput();

        input.getLiveValidator( 'string' );
        expect( input.LiveValidator ).not.toBeDefined();
    } );

    it( 'does not allow invalid boolean options', function() {
        var input = helper.bareInput();

        input.getLiveValidator( true );
        expect( input.LiveValidator ).not.toBeDefined();
    } );
};
