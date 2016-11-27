var theme = theme || {};
theme.uikitTooltip = theme.uikitTooltip || {};

theme.uikitTooltip.addErrorsSpec = function() {
    beforeEach( function() {
        jasmine.clock().install();
        this.row = helper.themes.uikit.getRow();
        this.input = this.row.querySelector( 'input' );
        this.theme = new LiveValidator.themes.UIkitTooltip( this.input, { tooltip: { animation: false } } );
    } );

    afterEach( function() {
        jasmine.clock().uninstall();
    } );

    it( 'already has errors', function() {
        this.input.dataset.cachedTitle = 'Old Error';
        this.theme.tooltip.show();

        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">Old Error</div>' );
        this.theme.addErrors( [ 'New Error' ] );
        expect( tooltip ).not.toContainText( 'Old Error' );
        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">New Error</div>' );
        expect( this.input ).toHaveClass( 'uk-form-danger' );
    } );

    it( 'having no errors', function() {
        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        this.theme.addErrors( [ 'New Error' ] );
        jasmine.clock().tick( 10 );
        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">New Error</div>' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        expect( this.input ).toHaveClass( 'uk-form-danger' );
    } );

    it( 'adding multiple errors', function() {
        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        jasmine.clock().tick( 10 );
        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">Error 1<br>Error 2</div>' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        expect( this.input ).toHaveClass( 'uk-form-danger' );
    } );

    it( 'adding errors when element has focus', function() {
        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        this.input.focus();
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        jasmine.clock().tick( 10 );
        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">Error 1<br>Error 2</div>' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( true );
    } );

    it( 'adding errors when element does not have focus', function() {
        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        this.theme.addErrors( [ 'Error 1', 'Error 2' ] );
        jasmine.clock().tick( 10 );
        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">Error 1<br>Error 2</div>' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
    } );
};
