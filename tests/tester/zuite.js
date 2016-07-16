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

    describe( 'HTML5 validation attribute', function() {
        describe( 'min is', function() {
            tester.html5validation.minSpec();
        } );
        describe( 'max is', function() {
            tester.html5validation.maxSpec();
        } );
        describe( 'minlength is', function() {
            tester.html5validation.minlengthSpec();
        } );
        describe( 'maxlength is', function() {
            tester.html5validation.maxlengthSpec();
        } );
        describe( 'pattern', function() {
            tester.html5validation.patternSpec();
        } );
        describe( 'isNumber', function() {
            tester.html5validation.isNumberSpec();
        } );
    } );
} );
