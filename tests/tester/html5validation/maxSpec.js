var tester = tester || {};
tester.html5validation = tester.html5validation || {};

tester.html5validation.maxSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
        this.value = 2;
    } );

    it( 'smaller than max', function() {
        expect( this.tester.max( this.value, 3 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'equals max', function() {
        expect( this.tester.max( this.value, 2 ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'bigger than max', function() {
        expect( this.tester.max( this.value, 1 ) ).toEqual( false );
        expect( this.tester.errors ).toEqual( [ 'Should be less than or equal 1' ] );
    } );

    it( 'is NaN', function() {
        expect( this.tester.max( 'NaN', 1 ) ).toEqual( false );
    } );
};
