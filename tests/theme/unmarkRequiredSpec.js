var theme = theme || {};
theme.default = theme.default || {};

theme.default.unmarkRequiredSpec = function() {
    beforeEach( function() {
        this.row = helper.theme.default.getRow();
        this.theme = new LiveValidatorTheme( $, $( this.row ).find( 'input' ) );
    } );

    it( 'already required', function() {
        expect( this.row.addClass( 'required' ) ).toHaveClass( 'required' );
        this.theme.unmarkRequired();
        expect( this.row ).not.toHaveClass( 'required' );
    } );

    it( 'not required', function() {
        expect( this.row ).not.toHaveClass( 'required' );
        this.theme.unmarkRequired();
        expect( this.row ).not.toHaveClass( 'required' );
    } );
};
