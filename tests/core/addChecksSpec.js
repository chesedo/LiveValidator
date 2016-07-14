/**
 * Tests if the `addChecks` method works as expected
 */
var core = core || {};

core.addChecksSpec = function() {
    function setupInstance( checks ) {
        checks = checks || [];
        return new LiveValidator( $, helper.bareInput(), { checks: checks } );
    }

    beforeAll( function() {
        LiveValidatorTester.prototype.check = function() {};
        LiveValidatorTester.prototype.check2 = function() {};
    } );

    afterAll( function() {
        delete LiveValidatorTester.prototype.check;
        delete LiveValidatorTester.prototype.check2;
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

    it( 'passing a non-array', function() {
        var instance = setupInstance( [ 'check' ] );

        instance.addChecks( { 'check2': true } );
        expect( instance.options.checks ).toEqual( [ 'check' ] );
    } );
};
