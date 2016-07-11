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
    describe( 'check `setRequired` when called', function() {
        core.setRequiredSpec();
    } );
    describe( 'check `unsetRequired` when called', function() {
        core.unsetRequiredSpec();
    } );
    describe( 'check `_performChecks` when', function() {
        core._performChecksSpec();
    } );
    describe( 'check `_filterChecks` when', function() {
        core._filterChecksSpec();
    } );
    describe( 'check `enableLive` when called', function() {
        core.enableLiveSpec();
    } );
} );
