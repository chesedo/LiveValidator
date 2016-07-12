/**
 * Tests if the `isValid` method works as expected
 */
var core = core || {};

core.isValidSpec = function() {
    beforeEach( function() {
        this.createInstance = function( required, checks ) {
            this.input = helper.bareInput();
            return LiveValidator( $, this.input, { checks: checks, required: required } );
        };
    } );

    beforeAll( function() {
        LiveValidatorTester.prototype.checkPass = function() {};
        LiveValidatorTester.prototype.checkFail = function() {
            this.addError( 'Failed' );
        };
    } );

    afterAll( function() {
        delete LiveValidatorTester.prototype.checkPass;
        delete LiveValidatorTester.prototype.checkFail;
    } );

    it( 'not required and checks passes - empty value', function() {
        var instance = this.createInstance( false, [ 'checkPass' ] );
        expect( instance.isValid() ).toBe( true );
    } );

    it( 'not required and checks fails - empty value', function() {
        var instance = this.createInstance( false, [ 'checkFail' ] );
        expect( instance.isValid() ).toBe( true );
    } );

    it( 'not required and checks passes - has value', function() {
        var instance = this.createInstance( false, [ 'checkPass' ] );
        this.input.val( 'value' );
        expect( instance.isValid() ).toBe( true );
    } );

    it( 'not required and checks fails - has value', function() {
        var instance = this.createInstance( false, [ 'checkFail' ] );
        this.input.val( 'value' );
        expect( instance.isValid() ).toBe( false );
    } );

    it( 'required and checks passes - empty value', function() {
        var instance = this.createInstance( true, [ 'checkPass' ] );
        expect( instance.isValid() ).toBe( false );
    } );

    it( 'required and checks fails - empty value', function() {
        var instance = this.createInstance( true, [ 'checkFail' ] );
        expect( instance.isValid() ).toBe( false );
    } );
};
