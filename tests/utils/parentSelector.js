var utils = utils || {};

utils.parentSelector = function() {
    beforeAll( function() {
        setFixtures( '<div id="outer" class="row"><div id="inner"></div>' );
        this.inner = document.getElementById( 'inner' );
        this.outer = document.getElementById( 'outer' );
    } );

    it( 'by tag name', function() {
        expect( LiveValidator.utils.parentSelector( this.inner, 'div' ) ).toBe( this.outer );
    } );

    it( 'by id', function() {
        expect( LiveValidator.utils.parentSelector( this.inner, '#outer' ) ).toBe( this.outer );
    } );

    it( 'by class', function() {
        expect( LiveValidator.utils.parentSelector( this.inner, '.row' ) ).toBe( this.outer );
    } );

    it( 'by tag and class', function() {
        expect( LiveValidator.utils.parentSelector( this.inner, 'div.row' ) ).toBe( this.outer );
    } );

    it( 'for no match', function() {
        expect( LiveValidator.utils.parentSelector( this.inner, '.parent' ) ).toBe( null );
    } );
};
