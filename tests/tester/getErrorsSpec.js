var tester = tester || {};

tester.getErrorsSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidatorTester();
    } );

    it( 'there are errors', function() {
        this.tester.errors = [ 'Error1' ];
        expect( this.tester.errors ).toEqual( [ 'Error1' ] );

        this.tester.getErrors();
        expect( this.tester.errors ).toEqual( [ 'Error1' ] );
    } );

    it( 'errors is empty', function() {
        expect( this.tester.errors ).toEqual( [] );

        this.tester.getErrors();
        expect( this.tester.errors ).toEqual( [] );
    } );
};
