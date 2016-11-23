var utils = utils || {};

utils.removeChild = function() {
    it( 'when not an Element', function() {
        expect( LiveValidator.utils.removeChild( Object.create( {} ), 'row' ) ).toBe( null );
    } );

    it( 'when element is empty', function() {
        setFixtures( '<div id="data"></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.removeChild( div, 'row' );
        expect( div ).toBeEmpty();
    } );

    it( 'when child can be found', function() {
        setFixtures( '<div id="data"><div class="row"></div></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.removeChild( div, '.row' );
        expect( div ).toBeEmpty();
    } );

    it( 'when child cannot be found', function() {
        setFixtures( '<div id="data"><div id="row"></div></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.removeChild( div, '.row' );
        expect( div ).toContainElement( '#row' );
    } );
};
