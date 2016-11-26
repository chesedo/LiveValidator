/**
 * The test suite for the bootstrap3Tooltip theme "class" (themes/Bootstrap3Tooltip.js)
 */

/* globals theme */
describe( 'Bootstrap3Tooltip theme', function() {
    describe( 'check instantiation', function() {
        theme.bootstrap3Tooltip.instantiationSpec();
    } );
    describe( 'check `addErrors` when', function() {
        theme.bootstrap3Tooltip.addErrorsSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        theme.bootstrap3Tooltip.clearErrorsSpec();
    } );
} );
