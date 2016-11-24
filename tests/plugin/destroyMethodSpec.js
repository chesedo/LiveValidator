/**
 * Tests the `destroy` method - to destroy the instance
 */
var plugin = plugin || {};
plugin.destroyMethodSpec = function() {
    it( 'when called on input having instance', function() {
        var input = helper.bareInput();
        var inputValidation = input.getLiveValidator();

        expect( input.LiveValidator ).toBeDefined();
        inputValidation.destroy();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'when called on multiple inputs - each having instance', function() {
        setFixtures( '<input type="text" /><input type="number" />' );
        var inputs = document.getElementsByTagName( 'input' );
        var inputsValidation = inputs.getLiveValidator();

        expect( inputs[ 0 ].LiveValidator ).toBeDefined();
        expect( inputs[ 1 ].LiveValidator ).toBeDefined();
        inputsValidation.destroy();
        expect( inputs[ 0 ].LiveValidator ).toBeUndefined();
        expect( inputs[ 1 ].LiveValidator ).toBeUndefined();
    } );

    it( 'to make list empty', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( inputValidation.getInputs() ).not.toEqual( [ ] );
        inputValidation.destroy();
        expect( inputValidation.getInputs() ).toEqual( [ ] );
    } );
};
