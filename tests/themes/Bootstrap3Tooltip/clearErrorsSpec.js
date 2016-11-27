var theme = theme || {};
theme.bootstrap3Tooltip = theme.bootstrap3Tooltip || {};

theme.bootstrap3Tooltip.clearErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.input = this.row.querySelector( 'input' );
        this.theme = new LiveValidator.themes.Bootstrap3Tooltip( this.input );
    } );

    it( 'already has errors', function() {
        this.input.dataset.originalTitle = 'Error';
        this.theme.tooltip.show();

        expect( this.row ).toContainHtml( '<div class="tooltip-inner">Error</div>' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainText( 'Error' );
        expect( this.row ).not.toContainElement( 'div.tooltip-inner' );
        expect( this.row ).not.toHaveClass( 'has-warning' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( '.tooltip' );
        this.theme.clearErrors();
        this.input.focus();
        expect( this.row ).not.toContainElement( '.tooltip' );
        expect( this.row ).not.toHaveClass( 'has-warning' );
    } );
};
