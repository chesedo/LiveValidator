/**
 * Tests the `isValid` method
 */
var plugin = plugin || {};
plugin.isValidMethodSpec = function() {
    it( 'one input passes', function() {
        var input = helper.bareInput();

        input.LiveValidator();
        expect( input.LiveValidator( 'isValid' ) ).toBe( true );
    } );

    it( 'one input fails', function() {
        var input = helper.requiredInput();

        input.LiveValidator();
        expect( input.LiveValidator( 'isValid' ) ).toBe( false );
    } );

    it( 'multiple inputs pass', function() {
        setFixtures( '<input type="text" /><input type="number" />' );
        var input = $( 'input' );

        input.LiveValidator();
        expect( input.LiveValidator( 'isValid' ) ).toBe( true );
    } );

    it( 'multiple inputs fail', function() {
        setFixtures( '<input type="text" required /><input type="number" required />' );
        var input = $( 'input' );

        input.LiveValidator();
        expect( input.LiveValidator( 'isValid' ) ).toBe( false );
    } );

    it( 'multiple inputs given with one fail', function() {
        setFixtures( '<input type="text" required /><input type="number" />' );
        var input = $( 'input' );

        input.LiveValidator();
        expect( input.LiveValidator( 'isValid' ) ).toBe( false );
    } );

    it( 'input does not have plugin instance', function() {
        var input = helper.bareInput();

        expect( input.LiveValidator( 'isValid' ) ).toBe( false );
    } );
};
