var theme = theme || {};
theme.uikitTooltip = theme.uikitTooltip || {};

theme.uikitTooltip.clearErrorsSpec = function() {
    beforeEach( function() {
        jasmine.clock().install();
        this.row = helper.themes.uikit.getRow();
        this.input = this.row.querySelector( 'input' );
    } );

    afterEach( function() {
        jasmine.clock().uninstall();
    } );

    it( 'already has errors', function() {
        var theme = new LiveValidator.themes.UIkitTooltip( this.input, { tooltip: { animation: false } } );
        this.input.dataset.cachedTitle = 'Old Error';
        theme.tooltip.show();
        jasmine.clock().tick( 10 );

        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.innerHTML ).toBe( '<div class="uk-tooltip-inner">Old Error</div>' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( true );
        theme.clearErrors();
        expect( this.input.dataset.cachedTitle ).toBe( '' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
    } );

    it( 'having no errors', function() {
        var theme = new LiveValidator.themes.UIkitTooltip( this.input, { tooltip: { animation: false } } );
        var tooltip = document.querySelector( '.uk-tooltip' );

        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        theme.clearErrors();
        expect( this.input.dataset.cachedTitle ).toBe( '' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
    } );

    it( 'with animation on', function() {
        var theme = new LiveValidator.themes.UIkitTooltip( this.input, { tooltip: { animation: true } } );
        this.input.dataset.cachedTitle = 'Old Error';
        theme.tooltip.show();
        jasmine.clock().tick( 10 );

        var tooltip = document.querySelector( '.uk-tooltip' );
        spyOn( $.fn, 'fadeOut' );

        expect( tooltip.matches( '.uk-active' ) ).toBe( true );
        theme.clearErrors();
        expect( $.fn.fadeOut ).toHaveBeenCalled();

        // Call fadeOut callback to test if it hides the tooltip
        $.fn.fadeOut.calls.argsFor( 0 )[ 1 ]();
        expect( this.input.dataset.cachedTitle ).toBe( '' );
        expect( tooltip.matches( '.uk-active' ) ).toBe( false );
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
    } );
};
