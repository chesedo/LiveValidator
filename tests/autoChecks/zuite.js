/**
 * The test suite for the autoChecks "class" (autoChecks/AutoChecks.js)
 */

/* globals autoChecks */
describe( 'AutoChecks', function() {
    describe( 'check instantiation', function() {
        autoChecks.instantiationSpec();
    } );
    describe( 'check getChecks', function() {
        autoChecks.getChecksSpec();
    } );
    describe( 'check checkbox input', function() {
        autoChecks.inputCheckboxSpec();
    } );
    describe( 'check color input', function() {
        autoChecks.inputColorSpec();
    } );

    // TODO: Add `date`, `datetime` and `datetime-local` tests here
    describe( 'check email input', function() {
        autoChecks.inputEmailSpec();
    } );

    // TODO: Add `month` test here
    describe( 'check number input', function() {
        autoChecks.inputNumberSpec();
    } );
    describe( 'check password input', function() {
        autoChecks.inputPasswordSpec();
    } );
    describe( 'check range input', function() {
        autoChecks.inputRangeSpec();
    } );
    describe( 'check search input', function() {
        autoChecks.inputSearchSpec();
    } );
    describe( 'check tel input', function() {
        autoChecks.inputTelSpec();
    } );
    describe( 'check text input', function() {
        autoChecks.inputTextSpec();
    } );

    // TODO: Add `time` test here
    describe( 'check url input', function() {
        autoChecks.inputUrlSpec();
    } );

    // TODO: Add `week` test here
} );
