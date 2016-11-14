var theme = theme || {};
theme.default = theme.default || {};

theme.default.instantiationSpec = function() {
    beforeEach( function() {
        this.options = {
            error: 'error',
            missing: 'missing',
            parentSelector: '.row'
        };
    } );

    it( 'when called without `new`', function() {
        var instance = LiveValidator.themes.Default( helper.bareInput() );

        expect( instance.options ).toBeDefined();
        expect( window.options ).toBeUndefined();
    } );

    it( 'when called without options', function() {
        var instance = new LiveValidator.themes.Default( helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'when called with options', function() {
        var instance = new LiveValidator.themes.Default( helper.bareInput(), { error: 'fail' } );

        this.options.error = 'fail';

        expect( instance.options ).toEqual( this.options );
    } );
};
