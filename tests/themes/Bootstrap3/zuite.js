/**
 * The test suite for the bootstrap3 theme "class" (themes/Bootstrap3.js)
 */

/* globals theme */
describe( 'Bootstrap3 theme', function() {
    describe( 'check instantiation', function() {
        theme.bootstrap3.instantiationSpec();
    } );
    describe( 'check `markRequired` when', function() {
        theme.bootstrap3.markRequiredSpec();
    } );
    describe( 'check `unmarkRequired` when', function() {
        theme.bootstrap3.unmarkRequiredSpec();
    } );
    describe( 'check `setMissing` when', function() {
        theme.bootstrap3.setMissingSpec();
    } );
    describe( 'check `unsetMissing` when', function() {
        theme.bootstrap3.unsetMissingSpec();
    } );
    describe( 'check `addErrors` when', function() {
        theme.bootstrap3.addErrorsSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        theme.bootstrap3.clearErrorsSpec();
    } );
} );
