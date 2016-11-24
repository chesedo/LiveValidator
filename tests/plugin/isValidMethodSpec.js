/**
 * Tests the `isValid` method
 */
var plugin = plugin || {};
plugin.isValidMethodSpec = function() {
    it( 'one input passes', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( inputValidation.isValid() ).toBe( true );
    } );

    it( 'one input fails', function() {
        var inputValidation = helper.requiredInput().getLiveValidator();

        expect( inputValidation.isValid() ).toBe( false );
    } );

    it( 'multiple inputs pass', function() {
        setFixtures( '<input type="text" /><input type="number" />' );
        var inputs = document.getElementsByTagName( 'input' );
        var inputValidation = inputs.getLiveValidator();

        expect( inputValidation.isValid() ).toBe( true );
    } );

    it( 'multiple inputs fail', function() {
        setFixtures( '<input type="text" required /><input type="number" required />' );
        var inputs = document.getElementsByTagName( 'input' );
        var inputValidation = inputs.getLiveValidator();

        expect( inputValidation.isValid() ).toBe( false );
    } );

    it( 'multiple inputs given with one fail', function() {
        setFixtures( '<input type="text" required /><input type="number" />' );
        var inputs = document.getElementsByTagName( 'input' );
        var inputValidation = inputs.getLiveValidator();

        expect( inputValidation.isValid() ).toBe( false );
    } );
};
