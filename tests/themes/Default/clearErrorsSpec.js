var theme = theme || {};
theme.default = theme.default || {};

theme.default.clearErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( $, $( this.row ).find( 'input' ) );
    } );

    it( 'already has errors', function() {
        this.row.addClass( 'error' ).append( '<ul class="errors"><li>Error</li></ul>' );
        expect( this.row ).toContainHtml( '<ul class="errors"><li>Error</li></ul>' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainText( 'Old Error' );
        expect( this.row ).not.toContainElement( 'ul' );
        expect( this.row ).not.toHaveClass( 'error' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'ul' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainElement( 'ul' );
        expect( this.row ).not.toHaveClass( 'error' );
    } );
};
