var tester = tester || {};
tester.html5validation = tester.html5validation || {};

tester.html5validation.patternSpec = function() {
    beforeEach( function() {
        this.tester = new LiveValidator.Tester();
        this.param = { regex: '^[a-z]+$', title: 'Should be lowercase letter' };
    } );

    it( 'matches', function() {
        expect( this.tester.pattern( 'abc', this.param ) ).toEqual( true );
        expect( this.tester.errors ).toEqual( [] );
    } );

    it( 'does not match', function() {
        expect( this.tester.pattern( 'Ab2c', this.param ) ).toEqual( false );
        expect( this.tester.errors ).toEqual( [ this.param.title ] );
    } );
};
