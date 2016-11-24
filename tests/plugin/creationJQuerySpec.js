/**
 * Tests that check the plugin creation
 */
var plugin = plugin || {};

plugin.creationjQuerySpec = function() {
    it( 'allows only the first instantiation', function() {
        var input = $( helper.bareInput() );

        input.LiveValidator();
        input.LiveValidator( { required: true } );
        expect( input[ 0 ].LiveValidator.options.required ).toEqual( false );
    } );
};
