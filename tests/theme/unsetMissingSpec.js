var theme = theme || {};
theme.default = theme.default || {};

theme.default.unsetMissingSpec = function() {
    beforeEach( function() {
        this.row = helper.theme.default.getRow();
        this.theme = new LiveValidatorTheme( $, $( this.row ).find( 'input' ) );
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
