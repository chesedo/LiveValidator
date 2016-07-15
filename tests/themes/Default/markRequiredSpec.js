var theme = theme || {};
theme.default = theme.default || {};

theme.default.markRequiredSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( $, $( this.row ).find( 'input' ) );
    } );

    it( 'already required', function() {
        expect( this.row.addClass( 'required' ) ).toHaveClass( 'required' );
        this.theme.markRequired();
        expect( this.row ).toHaveClass( 'required' );
    } );

    it( 'not required', function() {
        expect( this.row ).not.toHaveClass( 'required' );
        this.theme.markRequired();
        expect( this.row ).toHaveClass( 'required' );
    } );
};
