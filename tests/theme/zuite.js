/**
 * The test suite for the default theme "class" (LiveValidatorTheme.js)
 */

/* globals theme */
describe( 'Default theme', function() {
    describe( 'check instantiation', function() {
        theme.default.instantiationSpec();
    } );
    describe( 'check `markRequired` when', function() {
        theme.default.markRequiredSpec();
    } );
    describe( 'check `unmarkRequired` when', function() {
        theme.default.unmarkRequiredSpec();
    } );
    describe( 'check `setMissing` when', function() {
        theme.default.setMissingSpec();
    } );
    describe( 'check `unsetMissing` when', function() {
        theme.default.unsetMissingSpec();
    } );
} );
