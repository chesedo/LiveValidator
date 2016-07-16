var autoChecks = autoChecks || {};

autoChecks.instantiationSpec = function() {
    it( 'when called without `new`', function() {
        var tester = LiveValidator.AutoChecks( helper.bareInput() );

        expect( tester.checks ).toBeDefined();
        expect( window.checks ).toBeUndefined();
    } );

    it( 'when called', function() {
        var tester = new LiveValidator.AutoChecks( helper.bareInput() );

        expect( tester.checks ).toEqual( [] );
    } );
};
