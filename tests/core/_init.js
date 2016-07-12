/**
 * Tests if the `_init` function works as expected
 */
var core = core || {};

core._initSpec = function() {
    function setupInstance( options ) {
        options = options || {};
        return LiveValidator( $, helper.bareInput(), options );
    }

    it( 'theme is invalid', function() {
        var theme = [],
            instance = setupInstance( { theme: theme } );

        expect( instance.theme.constructor.name ).toEqual( 'LiveValidatorTheme' );
    } );

    it( 'theme is valid', function() {
        var theme = helper.createSpyTheme(),
            instance = setupInstance( { theme: theme } );

        expect( instance.theme.constructor.name ).toEqual( 'spyTheme' );
    } );

    it( 'theme is not set', function() {
        var theme = [],
            instance = setupInstance();

        expect( instance.theme.constructor.name ).toEqual( 'LiveValidatorTheme' );
    } );

    it( 'required is false', function() {
        var unsetRequired = spyOn( LiveValidator.prototype, 'unsetRequired' );

        expect( unsetRequired ).not.toHaveBeenCalled();
        setupInstance( { required: false } );
        expect( unsetRequired ).toHaveBeenCalled();
    } );

    it( 'required is true', function() {
        var setRequired = spyOn( LiveValidator.prototype, 'setRequired' );

        expect( setRequired ).not.toHaveBeenCalled();
        setupInstance( { required: true } );
        expect( setRequired ).toHaveBeenCalled();
    } );

    it( 'liveEnabled is false', function() {
        var disableLive = spyOn( LiveValidator.prototype, 'disableLive' );

        expect( disableLive ).not.toHaveBeenCalled();
        setupInstance( { liveEnabled: false } );
        expect( disableLive ).toHaveBeenCalled();
    } );

    it( 'liveEnabled is true', function() {
        var enableLive = spyOn( LiveValidator.prototype, 'enableLive' );

        expect( enableLive ).not.toHaveBeenCalled();
        setupInstance( { liveEnabled: true } );
        expect( enableLive ).toHaveBeenCalled();
    } );
};
