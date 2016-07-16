var tester = tester || {};
tester.html5validation = tester.html5validation || {};

tester.html5validation.minSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
        this.value = 2;
    } );

    it( 'smaller than min', function() {
        expect( this.tester.min( this.value, 3 ) ).toEqual( false );
        expect( this.tester.errors ).toEqual( [ 'Should be more than or equal 3' ] );
    } );

    it( 'equals min', function() {
        expect( this.tester.min( this.value, 2 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'bigger than min', function() {
        expect( this.tester.min( this.value, 1 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'is NaN', function() {
        expect( this.tester.min( 'NaN', 1 ) ).toEqual( false );
    } );
};
