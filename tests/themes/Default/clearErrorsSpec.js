var theme = theme || {};
theme.default = theme.default || {};

theme.default.clearErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( helper.themes.getInput( this.row ) );
    } );

    it( 'already has errors', function() {
        LiveValidator.utils.addClass( this.row, 'error' );
        var li = document.createElement( 'li' );
        li.innerHTML = 'Error';

        var ul = document.createElement( 'ul' );
        LiveValidator.utils.addClass( ul, 'errors' );
        ul.appendChild( li );

        this.row.appendChild( ul );
        expect( this.row ).toContainHtml( '<ul class="errors"><li>Error</li></ul>' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainText( 'Error' );
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
