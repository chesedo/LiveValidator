var tester = tester || {};

tester.addErrorSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
    } );

    it( 'already has errors', function() {
        this.tester.errors = [ 'Error1' ];
        expect( this.tester.errors ).toEqual( [ 'Error1' ] );

        this.tester.addError( 'Error2' );
        expect( this.tester.errors ).toEqual( [ 'Error1', 'Error2' ] );
    } );

    it( 'errors is empty', function() {
        expect( this.tester.errors ).toEqual( [] );

        this.tester.addError( 'Error1' );
        expect( this.tester.errors ).toEqual( [ 'Error1' ] );
    } );

    it( 'when adding a duplicate message', function() {
        this.tester.addError( 'Duplicate Error' );
        expect( this.tester.errors ).toEqual( [ 'Duplicate Error' ] );

        this.tester.addError( 'Duplicate Error' );
        expect( this.tester.errors ).toEqual( [ 'Duplicate Error' ] );
    } );
};
