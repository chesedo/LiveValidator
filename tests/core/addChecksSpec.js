/**
 * Tests if the `addChecks` method works as expected
 */
var core = core || {};

core.addChecksSpec = function() {
    function setupInstance( checks ) {
        checks = checks || [];
        return new LiveValidator.Core( $, helper.bareInput(), { checks: checks } );
    }

    beforeAll( function() {
        LiveValidator.Tester.prototype.check = function() {};
        LiveValidator.Tester.prototype.check2 = function() {};
        LiveValidator.Tester.prototype.checkParam = function() {};
    } );

    afterAll( function() {
        delete LiveValidator.Tester.prototype.check;
        delete LiveValidator.Tester.prototype.check2;
        delete LiveValidator.Tester.prototype.checkParam;
    } );

    it( 'adding one check to empty checks', function() {
        var instance = setupInstance();

        instance.addChecks( [ 'check' ] );
        expect( instance.options.checks ).toEqual( [ 'check' ] );
    } );

    it( 'adding one check to non-emtpy checks', function() {
        var instance = setupInstance( [ 'check' ] );

        instance.addChecks( [ 'check2' ] );
        expect( instance.options.checks ).toEqual( [ 'check', 'check2' ] );
    } );

    it( 'adding multiple checks', function() {
        var instance = setupInstance();

        instance.addChecks( [ 'check', 'check2' ] );
        expect( instance.options.checks ).toEqual( [ 'check', 'check2' ] );
    } );

    it( 'passing a a check with parameters', function() {
        var instance = setupInstance( [ 'check' ] );

        instance.addChecks( [ { 'checkParam': 5 } ] );
        expect( instance.options.checks ).toEqual( [ 'check', { checkParam: 5 } ] );
    } );

    it( 'passing a non-array', function() {
        var instance = setupInstance( [ 'check' ] );

        instance.addChecks( 'check2' );
        expect( instance.options.checks ).toEqual( [ 'check', 'check2' ] );
    } );
};
