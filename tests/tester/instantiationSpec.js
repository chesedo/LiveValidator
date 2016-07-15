var tester = tester || {};

tester.instantiationSpec = function() {
    it( 'when called without `new`', function() {
        var tester = LiveValidator.Tester();

        expect( tester.errors ).toBeDefined();
        expect( window.errors ).toBeUndefined();
    } );

    it( 'when called', function() {
        var tester = new LiveValidator.Tester();

        expect( tester.errors ).toEqual( [] );
    } );
};
