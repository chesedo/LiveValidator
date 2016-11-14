var theme = theme || {};
theme.default = theme.default || {};

theme.default.unmarkRequiredSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( helper.themes.getInput( this.row ) );
    } );

    it( 'already required', function() {
        LiveValidator.utils.addClass( this.row, 'required' );
        expect( this.row ).toHaveClass( 'required' );
        this.theme.unmarkRequired();
        expect( this.row ).not.toHaveClass( 'required' );
    } );

    it( 'not required', function() {
        expect( this.row ).not.toHaveClass( 'required' );
        this.theme.unmarkRequired();
        expect( this.row ).not.toHaveClass( 'required' );
    } );
};
