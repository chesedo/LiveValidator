var utils = utils || {};

utils.removeClass = function() {
    it( 'when not an Element', function() {
        expect( LiveValidator.utils.removeClass( Object.create( {} ), 'row' ) ).toBe( false );
    } );

    it( 'when class is empty', function() {
        setFixtures( '<div id="data"></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.removeClass( div, 'row' );
        expect( div ).not.toHaveClass( 'row' );
    } );

    it( 'when class is already set', function() {
        setFixtures( '<div id="data" class="row"></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.removeClass( div, 'row' );
        expect( div ).not.toHaveClass( 'row' );
    } );
};
