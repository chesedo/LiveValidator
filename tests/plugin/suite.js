/**
 * The test suite for the jquery plugin creation code (LiveValidatorPlugin.js)
 */
describe( 'Plugin', function() {
    describe( 'check that the filter', function() {
        plugin.filterSpec();
    } );
    describe( 'check that the defaults', function() {
        plugin.defaultsSpec();
    } );
    describe( 'check that creation', function() {
        plugin.creationSpec();
    } );
    describe( 'check that the methods', function() {
        plugin.methodsSpec();
    } );
} );
