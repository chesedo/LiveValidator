/**
 * Tests if the `_filterChecks` works as expected
 */
var core = core || {};

core._filterChecksSpec = function() {
    function getChecks( checks ) {
        var input = helper.bareInput(),
            instance = LiveValidator( $, this.input );

        instance.options.checks = checks || [];

        return instance._filterChecks.call( instance );
    }

    beforeAll( function() {
        LiveValidatorTester.prototype.declaredCheck = function() {};
        LiveValidatorTester.prototype.declaredCheck2 = function() {};
    } );

    afterAll( function() {
        delete LiveValidatorTester.prototype.declaredCheck;
        delete LiveValidatorTester.prototype.declaredCheck2;
    } );

    it( 'there are no checks', function() {
        expect( getChecks() ).toEqual( [] );
    } );

    it( 'there is an invalid/undeclared check', function() {
        var checks = [ 'undeclaredCheck' ];

        expect( getChecks( checks ) ).toEqual( [] );
    } );

    it( 'there is a valid check', function() {
        var checks = [ 'declaredCheck' ];

        expect( getChecks( checks ) ).toEqual( checks );
    } );

    it( 'there are multiple invalid/undeclared checks', function() {
        var checks = [ 'undeclaredCheck', 'undeclaredCheck2' ];

        expect( getChecks( checks ) ).toEqual( [] );
    } );

    it( 'there are multiple valid checks', function() {
        var checks = [ 'declaredCheck', 'declaredCheck2' ];

        expect( getChecks( checks ) ).toEqual( checks );
    } );

    it( 'there are duplicate valid checks', function() {
        var checks = [ 'declaredCheck', 'declaredCheck' ];

        expect( getChecks( checks ) ).toEqual( [ 'declaredCheck' ] );
    } );

    it( 'there one valid check; the other one is invalid', function() {
        var checks = [ 'declaredCheck', 'undeclaredCheck' ];

        expect( getChecks( checks ) ).toEqual( [ 'declaredCheck' ] );
    } );
};
