/**
 * Tests if the `_performChecks` works as expected
 */
var core = core || {};

core._performChecksSpec = function() {
    beforeEach( function() {
        var spyTheme = helper.createSpyTheme();

        this.addErrors = spyOn( spyTheme.prototype, 'addErrors' );
        this.clearErrors = spyOn( spyTheme.prototype, 'clearErrors' );

        this.setupInput = function( checks ) {
            checks = checks || [];

            var input = helper.bareInput();

            this.instance = LiveValidator( $, this.input, { theme: spyTheme } );
            this.instance.options.checks = checks;

            this.instance._performChecks( 'value' );
        };
    } );

    beforeAll( function() {
        LiveValidatorTester.prototype.declaredCheckFail = function() {
            this.addError( 'declaredCheckFail error' );
        };
        LiveValidatorTester.prototype.declaredCheckFail2 = function() {
            this.addError( 'declaredCheckFail2 error' );
        };
        LiveValidatorTester.prototype.declaredCheckPass = function() {
        };
    } );

    afterAll( function() {
        delete LiveValidatorTester.prototype.declaredCheckFail;
        delete LiveValidatorTester.prototype.declaredCheckFail2;
        delete LiveValidatorTester.prototype.declaredCheckPass;
    } );

    it( 'there are no checks', function() {
        this.setupInput();

        expect( this.addErrors ).not.toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
        expect( this.instance.errors ).toEqual( [] );
    } );

    it( 'the check fails', function() {
        this.setupInput( [ 'declaredCheckFail' ] );

        expect( this.addErrors ).toHaveBeenCalled();
        expect( this.addErrors ).toHaveBeenCalledWith( [ 'declaredCheckFail error' ] );
        expect( this.clearErrors ).not.toHaveBeenCalled();
    } );

    it( 'the check passes', function() {
        this.setupInput( [ 'declaredCheckPass' ] );

        expect( this.addErrors ).not.toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
    } );

    it( 'multiple checks fail', function() {
        this.setupInput( [ 'declaredCheckFail', 'declaredCheckFail2' ] );

        expect( this.addErrors ).toHaveBeenCalled();
        expect( this.addErrors ).toHaveBeenCalledWith( [ 'declaredCheckFail error', 'declaredCheckFail2 error' ] );
        expect( this.clearErrors ).not.toHaveBeenCalled();
    } );

    it( 'multiple checks pass', function() {
        this.setupInput( [ 'declaredCheckPass', 'declaredCheckPass' ] );

        expect( this.addErrors ).not.toHaveBeenCalled();
        expect( this.clearErrors ).toHaveBeenCalled();
    } );

    it( 'one check passes; the other one fails', function() {
        this.setupInput( [ 'declaredCheckPass', 'declaredCheckFail' ] );

        expect( this.addErrors ).toHaveBeenCalled();
        expect( this.addErrors ).toHaveBeenCalledWith( [ 'declaredCheckFail error' ] );
        expect( this.clearErrors ).not.toHaveBeenCalled();
    } );
};