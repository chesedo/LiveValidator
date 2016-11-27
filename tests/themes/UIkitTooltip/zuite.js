/**
 * The test suite for the uikitTooltip theme "class" (themes/UIkitTooltip.js)
 */

/* globals theme */
describe( 'UIkitTooltip theme', function() {
    describe( 'check instantiation', function() {
        theme.uikitTooltip.instantiationSpec();
    } );
    describe( 'check `addErrors` when', function() {
        theme.uikitTooltip.addErrorsSpec();
    } );
    describe( 'check `clearErrors` when', function() {
        theme.uikitTooltip.clearErrorsSpec();
    } );
} );
