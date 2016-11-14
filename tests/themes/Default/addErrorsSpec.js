var theme = theme || {};
theme.default = theme.default || {};

theme.default.addErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( helper.themes.getInput( this.row ) );
    } );

    it( 'already has errors', function() {
        LiveValidator.utils.addClass( this.row, 'error' );
        var li = document.createElement( 'li' );
        li.innerHTML = 'Old Error';

        var ul = document.createElement( 'ul' );
        LiveValidator.utils.addClass( ul, 'errors' );
        ul.appendChild( li );

        this.row.appendChild( ul );
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
