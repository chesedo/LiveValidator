var theme = theme || {};
theme.default = theme.default || {};

theme.default.unsetMissingSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( $, $( this.row ).find( 'input' ) );
    } );

    it( 'already missing', function() {
        expect( this.row.addClass( 'missing' ) ).toHaveClass( 'missing' );
        this.theme.unsetMissing();
        expect( this.row ).not.toHaveClass( 'missing' );
    } );

    it( 'not missing', function() {
        expect( this.row ).not.toHaveClass( 'missing' );
        this.theme.unsetMissing();
        expect( this.row ).not.toHaveClass( 'missing' );
    } );
};
