var utils = utils || {};

utils.addClass = function() {
    it( 'when not an Element', function() {
        expect( LiveValidator.utils.addClass( Object.create( {} ), 'row' ) ).toBe( false );
    } );

    it( 'when class is empty', function() {
        setFixtures( '<div id="data"></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.addClass( div, 'row' );
        expect( div ).toHaveClass( 'row' );
    } );

    it( 'when class is already set', function() {
        setFixtures( '<div id="data" class="row"></div>' );
        var div = document.getElementById( 'data' );

        LiveValidator.utils.addClass( div, 'row' );
        expect( div.getAttribute( 'class' ) ).toBe( 'row' );
    } );
};
