var theme = theme || {};
theme.bootstrap3Popover = theme.bootstrap3Popover || {};

theme.bootstrap3Popover.instantiationSpec = function() {
    beforeEach( function() {
        this.options = {
            error: 'has-warning',
            missing: 'has-error',
            parentSelector: '.form-group',
            popover: {
                html: true,
                placement: 'bottom',
                trigger: 'focus',
                title: 'Keep these in mind'
            }
        };
    } );

    it( 'when called without `new`', function() {
        var instance = LiveValidator.themes.Bootstrap3Popover( helper.bareInput() );

        expect( instance.options ).toBeDefined();
        expect( window.options ).toBeUndefined();
    } );

    it( 'when called without options', function() {
        var instance = new LiveValidator.themes.Bootstrap3Popover( helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'when called with options', function() {
        var instance = new LiveValidator.themes.Bootstrap3Popover( helper.bareInput(), { error: 'fail' } );

        this.options.error = 'fail';

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'that popover is not immediately shown', function() {
        var row = helper.themes.bootstrap3.getRow();
        var input = row.querySelector( 'input' );
        var hoverEvent = document.createEvent( 'Events' );
        hoverEvent.initEvent( 'mouseenter' );
        LiveValidator.themes.Bootstrap3Popover(
            input,
            {
                popover: { trigger: 'focus hover' }
            }
        );

        input.dispatchEvent( hoverEvent );
        expect( row ).not.toContainElement( '.popover' );
        input.focus();
        expect( row ).not.toContainElement( '.popover' );
    } );
};
