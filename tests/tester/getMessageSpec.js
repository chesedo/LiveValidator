var tester = tester || {};

tester.getMessageSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
    } );

    it( 'for a valid message', function() {
        expect( this.tester.getMessage( 'minNumber' ) ).toBe( LiveValidator.translations[ 'en-us' ].minNumber );
    } );

    it( 'for an unset message', function() {
        expect( this.tester.getMessage( 'number' ) ).toBe( LiveValidator.translations[ 'en-us' ].default );
    } );
};
