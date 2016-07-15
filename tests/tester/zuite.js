/**
 * The test suite for the tester "class" (LiveValidatorTester.js)
 */

/* globals tester */
describe( 'Tester', function() {
    describe( 'check instantiation', function() {
        tester.instantiationSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        tester.clearErrorsSpec();
    } );
} );
