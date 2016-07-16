var tester = tester || {};
tester.html5validation = tester.html5validation || {};

tester.html5validation.maxlengthSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
        this.value = '12';
    } );

    it( 'smaller than length', function() {
        expect( this.tester.maxlength( this.value, 3 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'equals length', function() {
        expect( this.tester.maxlength( this.value, 2 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'bigger than length', function() {
        expect( this.tester.maxlength( this.value, 1 ) ).toEqual( false );
        expect( this.tester.errors ).toEqual( [ 'Should be 1 characters or less' ] );
    } );
};
