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
} );
