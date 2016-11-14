/**
 * Tests the `destroy` method - to destroy the instance
 */
var plugin = plugin || {};
plugin.destroyMethodSpec = function() {
    it( 'called on input having instance', function() {
        var input = helper.bareJqInput();

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator ).toBeDefined();
        input.LiveValidator( 'destroy' );
        expect( $.data( input[ 0 ] ).LiveValidator ).toBeUndefined();
    } );

    it( 'called on multiple inputs - each having instance', function() {
        setFixtures( '<input type="text" /><input type="number" />' );
        var input = $( 'input' );

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator ).toBeDefined();
        expect( $.data( input[ 1 ] ).LiveValidator ).toBeDefined();
        input.LiveValidator( 'destroy' );
        expect( $.data( input[ 0 ] ).LiveValidator ).toBeUndefined();
        expect( $.data( input[ 1 ] ).LiveValidator ).toBeUndefined();
    } );
};
