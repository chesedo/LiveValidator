var theme = theme || {};
theme.bootstrap3Tooltip = theme.bootstrap3Tooltip || {};

theme.bootstrap3Tooltip.instantiationSpec = function() {
    beforeEach( function() {
        this.options = {
            error: 'has-warning',
            missing: 'has-error',
            parentSelector: '.form-group',
            tooltip: {
                html: true,
                placement: 'bottom'
            }
        };
    } );

    it( 'when called without `new`', function() {
        var instance = LiveValidator.themes.Bootstrap3Tooltip( helper.bareInput() );

        expect( instance.options ).toBeDefined();
        expect( window.options ).toBeUndefined();
    } );

    it( 'when called without options', function() {
        var instance = new LiveValidator.themes.Bootstrap3Tooltip( helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'when called with options', function() {
        var instance = new LiveValidator.themes.Bootstrap3Tooltip( helper.bareInput(), { error: 'fail' } );

        this.options.error = 'fail';

        expect( instance.options ).toEqual( this.options );
    } );
};
