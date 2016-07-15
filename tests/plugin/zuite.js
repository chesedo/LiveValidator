/**
 * The test suite for the jquery plugin creation code (plugin/LiveValidatorPlugin.js)
 */

/* globals plugin */
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
    describe( 'check the `isValid` method when', function() {
        plugin.isValidMethodSpec();
    } );
    describe( 'check the `destroy` method when', function() {
        plugin.destroyMethodSpec();
    } );
} );
