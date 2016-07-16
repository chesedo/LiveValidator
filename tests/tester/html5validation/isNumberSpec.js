var tester = tester || {};
tester.html5validation = tester.html5validation || {};

tester.html5validation.isNumberSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
    } );

    it( 'when a number', function() {
        expect( this.tester.isNumber( '52' ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'when NaN', function() {
        expect( this.tester.isNumber( 'abc' ) ).toEqual( false );
        expect( this.tester.errors ).toEqual( [ 'Value should be a number' ] );
    } );
};
