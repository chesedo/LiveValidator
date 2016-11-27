var theme = theme || {};
theme.uikitTooltip = theme.uikitTooltip || {};

theme.uikitTooltip.instantiationSpec = function() {
    beforeEach( function() {
        this.options = {
            danger: 'uk-form-danger',
            success: 'uk-form-success',
            parentSelector: '.uk-form-row',
            controlsSelector: '.uk-form-controls',
            tooltip: {
                pos: 'bottom-left',
                animation: true
            }
        };
    } );

    it( 'when called without `new`', function() {
        var instance = LiveValidator.themes.UIkitTooltip( helper.bareInput() );

        expect( instance.options ).toBeDefined();
        expect( window.options ).toBeUndefined();
    } );

    it( 'when called without options', function() {
        var instance = new LiveValidator.themes.UIkitTooltip( helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'when called with options', function() {
        var instance = new LiveValidator.themes.UIkitTooltip( helper.bareInput(), { error: 'fail' } );

        this.options.error = 'fail';

        expect( instance.options ).toEqual( this.options );
    } );
};
