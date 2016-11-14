/**
 * Tests if the `_filterChecks` works as expected
 */
var core = core || {};

core._filterChecksSpec = function() {
    function getChecks( checks ) {
        var input = helper.bareInput(),
            instance = new LiveValidator.Core( input );

        checks = checks || [];

        return instance._filterChecks( checks );
    }

    beforeAll( function() {
        LiveValidator.Tester.prototype.declaredCheck = function() {};
        LiveValidator.Tester.prototype.declaredCheck2 = function() {};
        LiveValidator.Tester.prototype.checkParam = function() {};
    } );

    afterAll( function() {
        delete LiveValidator.Tester.prototype.declaredCheck;
        delete LiveValidator.Tester.prototype.declaredCheck2;
        delete LiveValidator.Tester.prototype.checkParam;
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

    it( 'passing a check that has parameters', function() {
        var checks = [ { 'checkParam': 5 } ];

        expect( getChecks( checks ) ).toEqual( [ { checkParam: 5 } ] );
    } );

    it( 'passing a non-array', function() {
        var checks = { 'checkParam': 5 };

        expect( getChecks( checks ) ).toEqual( [] );
    } );
};
