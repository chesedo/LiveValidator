var theme = theme || {};
theme.bootstrap3Popover = theme.bootstrap3Popover || {};

theme.bootstrap3Popover.addErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.input = this.row.querySelector( 'input' );
        this.theme = new LiveValidator.themes.Bootstrap3Popover( this.input );
    } );

    it( 'already has errors', function() {
        this.input.dataset.content = 'Old Error';
        this.theme.popover.show();

        expect( this.row ).toContainHtml( '<div class="popover-content">Old Error</div>' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( this.row ).not.toContainText( 'Old Error' );
        expect( this.row ).toContainHtml( '<div class="popover-content">New Error</div>' );
        expect( this.row ).toHaveClass( 'has-warning' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'div.popover-content' );
        this.theme.addErrors( [ 'New Error' ] );
        this.input.focus();
        expect( this.row ).toContainHtml( '<div class="popover-content">New Error</div>' );
        expect( this.row ).toHaveClass( 'has-warning' );
    } );

    it( 'adding multiple errors', function() {
        expect( this.row ).not.toContainElement( 'div.popover-content' );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        this.input.focus();
        expect( this.row ).toContainHtml( '<div class="popover-content">Error 1<br>Error 2</div>' );
    } );

    it( 'adding errors when element has focus', function() {
        expect( this.row ).not.toContainElement( 'div.popover-content' );
        this.theme.element.focus();
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        expect( this.row ).toContainHtml( '<div class="popover-content">Error 1<br>Error 2</div>' );
    } );

    it( 'adding errors when element does not have focus', function() {
        expect( this.row ).not.toContainElement( 'div.popover-content' );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        expect( this.row ).not.toContainHtml( '<div class="popover-content">Error 1<br>Error 2</div>' );
    } );
};
