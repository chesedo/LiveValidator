var tester = tester || {};

tester.instantiationSpec = function() {
    it( 'when called without `new`', function() {
        var tester = LiveValidatorTester();

        expect( tester.errors ).toBeDefined();
        expect( window.errors ).toBeUndefined();
    } );

    it( 'when called', function() {
        var tester = new LiveValidatorTester();

        expect( tester.errors ).toEqual( [] );
    } );
};
