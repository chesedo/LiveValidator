/**
 * Tests that check the default options for the plugin
 */
var plugin = plugin || {};

plugin.defaultsSpec = function() {

    // To restore the defaults when done
    beforeAll( function() {
        this._defaults = LiveValidator.utils.extend( {}, LiveValidator.defaults );
    } );

    beforeEach( function() {
        LiveValidator.defaults = LiveValidator.utils.extend( {}, this._defaults );
    } );

    afterAll( function() {
        LiveValidator.defaults = LiveValidator.utils.extend( {}, this._defaults );
    } );

    it( 'can be overwritten through `LiveValidator.defaults`', function() {
        LiveValidator.defaults.requiredHTML = '*';
        LiveValidator.defaults.themeData.parentSelector = 'group';

        expect( LiveValidator.defaults.requiredHTML ).toEqual( '*' );
        expect( LiveValidator.defaults.themeData.parentSelector ).toEqual( 'group' );
    } );

    it( 'can be overwritten by calling `LiveValidator`', function() {
        $.LiveValidator( {
            requiredHTML: '*',
            themeData: {
                parentSelector: 'group'
            }
        } );

        expect( LiveValidator.defaults.requiredHTML ).toEqual( '*' );
        expect( LiveValidator.defaults.themeData.parentSelector ).toEqual( 'group' );
    } );
};
