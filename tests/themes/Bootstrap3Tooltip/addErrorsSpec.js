var theme = theme || {};
theme.bootstrap3Tooltip = theme.bootstrap3Tooltip || {};

theme.bootstrap3Tooltip.addErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.input = this.row.querySelector( 'input' );
        this.theme = new LiveValidator.themes.Bootstrap3Tooltip( this.input );
    } );

    it( 'already has errors', function() {
        this.input.dataset.originalTitle = 'Old Error';
        this.theme.tooltip.show();

        expect( this.row ).toContainHtml( '<div class="tooltip-inner">Old Error</div>' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( this.row ).not.toContainText( 'Old Error' );
        expect( this.row ).toContainHtml( '<div class="tooltip-inner">New Error</div>' );
        expect( this.row ).toHaveClass( 'has-warning' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'div.tooltip-inner' );
        this.theme.addErrors( [ 'New Error' ] );
        this.input.focus();
        expect( this.row ).toContainHtml( '<div class="tooltip-inner">New Error</div>' );
        expect( this.row ).toHaveClass( 'has-warning' );
    } );

    it( 'adding multiple errors', function() {
        expect( this.row ).not.toContainElement( 'div.tooltip-inner' );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        this.input.focus();
        expect( this.row ).toContainHtml( '<div class="tooltip-inner">Error 1<br>Error 2</div>' );
    } );

    it( 'adding errors when element has focus', function() {
        expect( this.row ).not.toContainElement( 'div.tooltip-inner' );
        this.theme.element.focus();
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        expect( this.row ).toContainHtml( '<div class="tooltip-inner">Error 1<br>Error 2</div>' );
    } );

    it( 'adding errors when element does not have focus', function() {
        expect( this.row ).not.toContainElement( 'div.tooltip-inner' );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        expect( this.row ).not.toContainHtml( '<div class="tooltip-inner">Error 1<br>Error 2</div>' );
    } );
};
