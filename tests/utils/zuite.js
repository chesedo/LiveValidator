/**
 * The test suite for the utils object (utils/utils.js)
 */

/* globals utils */
describe( 'Utils', function() {
    describe( 'check extend', function() {
        utils.extend();
    } );
    describe( 'check getData', function() {
        utils.getData();
    } );
    describe( 'check parentSelector', function() {
        utils.parentSelector();
    } );
    describe( 'check addClass', function() {
        utils.addClass();
    } );
    describe( 'check removeClass', function() {
        utils.removeClass();
    } );
    describe( 'check removeChild', function() {
        utils.removeChild();
    } );
    describe( 'check appendChild', function() {
        utils.appendChild();
    } );
} );
