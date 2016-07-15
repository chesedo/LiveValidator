/**
 * Tests if the `removeAllChecks` method works as expected
 */
var core = core || {};

core.removeAllChecksSpec = function() {
    beforeEach( function() {
        this.instance = new LiveValidator.Core( $, helper.bareInput(), { checks: [ 'check', 'check2' ] } );
    } );

    beforeAll( function() {
        LiveValidator.Tester.prototype.check = function() {};
        LiveValidator.Tester.prototype.check2 = function() {};
    } );

    afterAll( function() {
        delete LiveValidator.Tester.prototype.check;
        delete LiveValidator.Tester.prototype.check2;
    } );

    it( 'called', function() {
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
        this.instance.removeAllChecks();
        expect( this.instance.options.checks ).toEqual( [] );
    } );
};
