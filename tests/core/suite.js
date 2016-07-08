/**
 * The test suite for the core plugin "class" (LiveValidator.js)
 */
describe( 'Core', function() {
    describe( 'check instantiation', function() {
        core.instantiationSpec();
    } );
    describe( 'check `_isValidTheme`', function() {
        core._isValidThemeSpec();
    } );
    describe( 'check `_blur` when input is', function() {
        core._blurSpec();
    } );
} );
