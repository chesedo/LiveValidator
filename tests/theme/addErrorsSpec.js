var theme = theme || {};
theme.default = theme.default || {};

theme.default.addErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.theme.default.getRow();
        this.theme = new LiveValidatorTheme( $, $( this.row ).find( 'input' ) );
    } );

    it( 'already has errors', function() {
        this.row.addClass( 'error' ).append( '<ul class="errors"><li>Old Error</li></ul>' );
        expect( this.row ).toContainHtml( '<ul class="errors"><li>Old Error</li></ul>' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( this.row ).not.toContainText( 'Old Error' );
        expect( this.row ).toContainHtml( '<ul class="errors"><li>New Error</li></ul>' );
        expect( this.row ).toHaveClass( 'error' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'ul' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( this.row ).toContainHtml( '<ul class="errors"><li>New Error</li></ul>' );
        expect( this.row ).toHaveClass( 'error' );
    } );

    it( 'adding multiple errors', function() {
        expect( this.row ).not.toContainElement( 'ul' );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        expect( this.row ).toContainHtml( '<ul class="errors"><li>Error 1</li><li>Error 2</li></ul>' );
    } );
};
