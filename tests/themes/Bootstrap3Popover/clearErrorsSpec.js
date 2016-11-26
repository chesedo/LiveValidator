var theme = theme || {};
theme.bootstrap3Popover = theme.bootstrap3Popover || {};

theme.bootstrap3Popover.clearErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.input = this.row.querySelector( 'input' );
        this.theme = new LiveValidator.themes.Bootstrap3Popover( this.input );
    } );

    it( 'already has errors', function() {
        this.input.dataset.content = 'Error';
        this.theme.popover.show();

        expect( this.row ).toContainHtml( '<div class="popover-content">Error</div>' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainText( 'Error' );
        expect( this.row ).not.toContainElement( '.popover' );
        expect( this.row ).not.toHaveClass( 'has-warning' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( '.popover' );
        this.theme.clearErrors();
        this.input.focus();
        expect( this.row ).not.toContainElement( '.popover' );
        expect( this.row ).not.toHaveClass( 'has-warning' );
    } );
};
