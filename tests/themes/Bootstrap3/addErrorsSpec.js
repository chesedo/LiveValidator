var theme = theme || {};
theme.bootstrap3 = theme.bootstrap3 || {};

theme.bootstrap3.addErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.theme = new LiveValidator.themes.Bootstrap3( this.row.querySelector( 'input' ) );
    } );

    it( 'already has errors', function() {
        this.row.classList.add( 'has-warning' );
        var span = document.createElement( 'span' );
        span.innerHTML = 'Old Error';
        span.classList.add( 'help-block' );

        var div = document.createElement( 'div' );
        div.classList.add( 'errors' );
        div.appendChild( span );

        this.row.appendChild( div );
        expect( this.row ).toContainHtml( '<div class="errors"><span class="help-block">Old Error</span></div>' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( this.row ).not.toContainText( 'Old Error' );
        expect( this.row ).toContainHtml( '<div class="errors"><span class="help-block">New Error</span></div>' );
        expect( this.row ).toHaveClass( 'has-warning' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'div' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( this.row ).toContainHtml( '<div class="errors"><span class="help-block">New Error</span></div>' );
        expect( this.row ).toHaveClass( 'has-warning' );
    } );

    it( 'adding multiple errors', function() {
        expect( this.row ).not.toContainElement( 'div' );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        expect( this.row ).toContainHtml( '<div class="errors"><span class="help-block">Error 1</span>' +
         '<span class="help-block">Error 2</span></div>' );
    } );
};
