/**
 * The test suite for the tester "class" (tester/LiveValidatorTester.js)
 */

/* globals tester */
describe( 'Tester', function() {
    describe( 'check instantiation', function() {
        tester.instantiationSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        tester.clearErrorsSpec();
    } );
    describe( 'check `addError` when', function() {
        tester.addErrorSpec();
    } );
    describe( 'check `getErrors` when', function() {
        tester.getErrorsSpec();
    } );
} );
