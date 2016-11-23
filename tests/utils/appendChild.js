var utils = utils || {};

utils.appendChild = function() {
    beforeAll( function() {
        this.row = document.createElement( 'div' );
    } );

    it( 'when element is not Element', function() {
        expect( LiveValidator.utils.appendChild( Object.create( {} ), this.row ) ).toBe( null );
    } );

    it( 'when valid Element', function() {
        setFixtures( '<div id="data"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.appendChild( div, this.row ) ).toBe( this.row );
    } );

    it( 'when child already added', function() {
        setFixtures( '<div id="data"></div>' );
        var div = document.getElementById( 'data' );
        div.appendChild( this.row );

        expect( LiveValidator.utils.appendChild( div, this.row ) ).toBe( this.row );
    } );
};
