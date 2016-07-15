var tester = tester || {};

tester.clearErrorsSpec = function() {
    it( 'called', function() {
        var tester = new LiveValidatorTester();

        tester.errors = [ 'Error1', 'Error2' ];
        expect( tester.errors ).toEqual( [ 'Error1', 'Error2' ] );

        tester.clearErrors();
        expect( tester.errors ).toEqual( [] );
    } );
};
