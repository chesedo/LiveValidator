var tester = tester || {};
tester.html5validation = tester.html5validation || {};

tester.html5validation.minlengthSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
        this.value = '12';
    } );

    it( 'smaller than length', function() {
        expect( this.tester.minlength( this.value, 3 ) ).toEqual( false );
        expect( this.tester.errors ).toEqual( [ 'Should be 3 characters or more' ] );
    } );

    it( 'equals length', function() {
        expect( this.tester.minlength( this.value, 2 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'bigger than length', function() {
        expect( this.tester.minlength( this.value, 1 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );
};
