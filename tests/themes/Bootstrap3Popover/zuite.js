/**
 * The test suite for the bootstrap3Popover theme "class" (themes/Bootstrap3Popover.js)
 */

/* globals theme */
describe( 'Bootstrap3Popover theme', function() {
    describe( 'check instantiation', function() {
        theme.bootstrap3Popover.instantiationSpec();
    } );
    describe( 'check `addErrors` when', function() {
        theme.bootstrap3Popover.addErrorsSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        theme.bootstrap3Popover.clearErrorsSpec();
    } );
} );
