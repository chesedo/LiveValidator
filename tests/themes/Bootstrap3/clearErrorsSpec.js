var theme = theme || {};
theme.bootstrap3 = theme.bootstrap3 || {};

theme.bootstrap3.clearErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.theme = new LiveValidator.themes.Bootstrap3( this.row.querySelector( 'input' ) );
    } );

    it( 'already has errors', function() {
        this.row.classList.add( 'has-warning' );
        var span = document.createElement( 'span' );
        span.innerHTML = 'Error';
        span.classList.add( 'help-block' );

        var div = document.createElement( 'div' );
        div.classList.add( 'errors' );
        div.appendChild( span );

        this.row.appendChild( div );
        expect( this.row ).toContainHtml( '<div class="errors"><span class="help-block">Error</span></div>' );

        this.theme.clearErrors();
        expect( this.row ).not.toContainText( 'Error' );
        expect( this.row ).not.toContainElement( 'div.errors' );
        expect( this.row ).not.toHaveClass( 'has-warning' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'div.errors' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainElement( 'div.errors' );
        expect( this.row ).not.toHaveClass( 'has-warning' );
    } );
};
