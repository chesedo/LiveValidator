/**
 * Tests if the `removeChecks` method works as expected
 */
var core = core || {};

core.removeChecksSpec = function() {
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

    it( 'removing one check', function() {
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
        this.instance.removeChecks( [ 'check2' ] );
        expect( this.instance.options.checks ).toEqual( [ 'check' ] );
    } );

    it( 'removing multiple checks', function() {
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
        this.instance.removeChecks( [ 'check', 'check2' ] );
        expect( this.instance.options.checks ).toEqual( [] );
    } );

    it( 'passing a non-array', function() {
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
        this.instance.removeChecks( { 'check': true } );
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
    } );

    it( 'passing nothing', function() {
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
        this.instance.removeChecks();
        expect( this.instance.options.checks ).toEqual( [ 'check', 'check2' ] );
    } );
};
