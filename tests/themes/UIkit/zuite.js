/**
 * The test suite for the uikit theme "class" (themes/UIkit.js)
 */

/* globals theme */
describe( 'UIkit theme', function() {
    describe( 'check instantiation', function() {
        theme.uikit.instantiationSpec();
    } );
    describe( 'check `markRequired` when', function() {
        theme.uikit.markRequiredSpec();
    } );
    describe( 'check `unmarkRequired` when', function() {
        theme.uikit.unmarkRequiredSpec();
    } );
    describe( 'check `setMissing` when', function() {
        theme.uikit.setMissingSpec();
    } );
    describe( 'check `unsetMissing` when', function() {
        theme.uikit.unsetMissingSpec();
    } );
    describe( 'check `addErrors` when', function() {
        theme.uikit.addErrorsSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        theme.uikit.clearErrorsSpec();
    } );
} );
