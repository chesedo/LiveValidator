/**
 * Tests if the `removeAllChecks` method works as expected
 */
var core = core || {};

core.removeAllChecksSpec = function() {
    beforeEach( function() {
        this.instance = new LiveValidator( $, helper.bareInput(), { checks: [ 'check', 'check2' ] } );
    } );

    beforeAll( function() {
        LiveValidatorTester.prototype.check = function() {};
        LiveValidatorTester.prototype.check2 = function() {};
    } );

    afterAll( function() {
        delete LiveValidatorTester.prototype.check;
        delete LiveValidatorTester.prototype.check2;
    } );

    it( 'called', function() {
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
        this.instance.removeAllChecks();
        expect( this.instance.options.checks ).toEqual( [] );
    } );
};
