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

    it( 'setting default messages', function() {
        var tester = new LiveValidator.Tester();

        expect( tester.messages ).toEqual( LiveValidator.translations[ 'en-us' ] );
    } );

    it( 'setting specified messages', function() {
        var locale = 'af';
        var tester = new LiveValidator.Tester( locale );

        expect( tester.messages ).toEqual( LiveValidator.translations[ locale ] );
    } );

    it( 'setting specified messages for partial locale', function() {

        // Save message to restore it
        var mes = LiveValidator.translations.af.maxNumber;
        delete LiveValidator.translations.af.maxNumber;
        var messages = LiveValidator.utils.extend(
            {},
            LiveValidator.translations[ 'en-us' ],
            LiveValidator.translations.af
        );
        var tester = new LiveValidator.Tester( 'af' );

        expect( tester.messages ).toEqual( messages );

        // Restore messages
        LiveValidator.translations.af.maxNumber = mes;
    } );
};
