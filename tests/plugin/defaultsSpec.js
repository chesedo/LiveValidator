/**
 * Tests that check the default options for the plugin
 */
var plugin = plugin || {};

plugin.defaultsSpec = function() {

    // To restore the defaults when done
    beforeAll( function() {
        this._defaults = $.extend( {}, $.fn.LiveValidator.defaults );
    } );

    beforeEach( function() {
        $.fn.LiveValidator.defaults = $.extend( {}, this._defaults );
    } );

    afterAll( function() {
        $.fn.LiveValidator.defaults = $.extend( {}, this._defaults );
    } );

    it( 'can be overwritten through `$.fn.LiveValidator.defaults`', function() {
        $.fn.LiveValidator.defaults.requiredHTML = '*';
        $.fn.LiveValidator.defaults.class.parentSelector = 'group';

        expect( $.fn.LiveValidator.defaults.requiredHTML ).toEqual( '*' );
        expect( $.fn.LiveValidator.defaults.class.parentSelector ).toEqual( 'group' );
    } );

    it( 'can be overwritten by calling `LiveValidator`', function() {
        $.LiveValidator( {
            requiredHTML: '*',
            class: {
                parentSelector: 'group'
            }
        } );

        expect( $.fn.LiveValidator.defaults.requiredHTML ).toEqual( '*' );
        expect( $.fn.LiveValidator.defaults.class.parentSelector ).toEqual( 'group' );
    } );
};
