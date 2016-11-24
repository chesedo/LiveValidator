/**
 * Tests to check that the plugin is bound only to supported inputs
 *
 * Based on all available inputs gotten from
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */
var plugin = plugin || {};
plugin.filterSpec = function() {
    it( 'allows checkbox inputs', function() {
        setFixtures( '<input type="checkbox" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows color inputs', function() {
        setFixtures( '<input type="color" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows date inputs', function() {
        setFixtures( '<input type="date" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows datetime inputs', function() {
        setFixtures( '<input type="datetime" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows datetime-local inputs', function() {
        setFixtures( '<input type="datetime-local" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows email inputs', function() {
        setFixtures( '<input type="email" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows month inputs', function() {
        setFixtures( '<input type="month" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows number inputs', function() {
        setFixtures( '<input type="number" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows password inputs', function() {
        setFixtures( '<input type="password" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows range inputs', function() {
        setFixtures( '<input type="range" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows search inputs', function() {
        setFixtures( '<input type="search" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows tel inputs', function() {
        setFixtures( '<input type="tel" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows text inputs', function() {
        setFixtures( '<input type="text" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows time inputs', function() {
        setFixtures( '<input type="time" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows url inputs', function() {
        setFixtures( '<input type="url" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows week inputs', function() {
        setFixtures( '<input type="week" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'does not allow button inputs', function() {
        setFixtures( '<input type="button" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow file inputs', function() {
        setFixtures( '<input type="file" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow hidden inputs', function() {
        setFixtures( '<input type="hidden" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow image inputs', function() {
        setFixtures( '<input type="image" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow radio inputs', function() {
        setFixtures( '<input type="radio" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow reset inputs', function() {
        setFixtures( '<input type="reset" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow submit inputs', function() {
        setFixtures( '<input type="submit" />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow non-inputs', function() {
        setFixtures( '<div/>' );
        var div = document.getElementsByTagName( 'div' )[ 0 ];

        div.getLiveValidator();
        expect( div.LiveValidator ).toBeUndefined();
    } );

    it( 'allows generic input', function() {
        setFixtures( '<input />' );
        var input = document.getElementsByTagName( 'input' )[ 0 ];

        input.getLiveValidator();
        expect( input.LiveValidator ).toBeDefined();
    } );

    it( 'allows multiple valid inputs', function() {
        setFixtures( '<input type="text" /><input type="number" />' );
        var inputs = document.getElementsByTagName( 'input' );

        inputs.getLiveValidator();
        expect( inputs[ 0 ].LiveValidator ).toBeDefined();
        expect( inputs[ 1 ].LiveValidator ).toBeDefined();
    } );

    it( 'allows multiple inputs with some invalid', function() {
        setFixtures( '<input type="text" /><input type="number" /><input type="submit" />' );
        var inputs = document.getElementsByTagName( 'input' );

        inputs.getLiveValidator();
        expect( inputs[ 0 ].LiveValidator ).toBeDefined();
        expect( inputs[ 1 ].LiveValidator ).toBeDefined();
        expect( inputs[ 2 ].LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow all invalid multiple inputs', function() {
        setFixtures( '<input type="radio" /><input type="submit" />' );
        var inputs = document.getElementsByTagName( 'input' );

        inputs.getLiveValidator();
        expect( inputs[ 0 ].LiveValidator ).toBeUndefined();
        expect( inputs[ 1 ].LiveValidator ).toBeUndefined();
    } );

    it( 'allows deep nested inputs', function() {
        setFixtures( '<div><input /></div>' );
        var div = document.getElementsByTagName( 'div' )[ 0 ];

        div.getLiveValidator();
        expect( div.LiveValidator ).toBeUndefined();
        expect( div.querySelector( 'input' ).LiveValidator ).toBeDefined();
    } );

    it( 'does not allow invalid deep nested inputs', function() {
        setFixtures( '<div><input type="radio"/></div>' );
        var div = document.getElementsByTagName( 'div' )[ 0 ];

        div.getLiveValidator();
        expect( div.LiveValidator ).toBeUndefined();
        expect( div.querySelector( 'input' ).LiveValidator ).toBeUndefined();
    } );

    it( 'allows multiple deep nested inputs', function() {
        setFixtures( '<div><input /><input /></div>' );
        var div = document.getElementsByTagName( 'div' )[ 0 ];

        div.getLiveValidator();
        expect( div.LiveValidator ).toBeUndefined();
        expect( div.querySelectorAll( 'input' )[ 0 ].LiveValidator ).toBeDefined();
        expect( div.querySelectorAll( 'input' )[ 1 ].LiveValidator ).toBeDefined();
    } );

    it( 'allows multiple deep nested inputs with some invalid', function() {
        setFixtures( '<div><input /><input type="radio" /></div>' );
        var div = document.getElementsByTagName( 'div' )[ 0 ];

        div.getLiveValidator();
        expect( div.LiveValidator ).toBeUndefined();
        expect( div.querySelectorAll( 'input' )[ 0 ].LiveValidator ).toBeDefined();
        expect( div.querySelectorAll( 'input' )[ 1 ].LiveValidator ).toBeUndefined();
    } );

    it( 'does not allow invalid multiple deep nested inputs', function() {
        setFixtures( '<div><input type="radio"/><input type="radio"/></div>' );
        var div = document.getElementsByTagName( 'div' )[ 0 ];

        div.getLiveValidator();
        expect( div.LiveValidator ).toBeUndefined();
        expect( div.querySelectorAll( 'input' )[ 0 ].LiveValidator ).toBeUndefined();
        expect( div.querySelectorAll( 'input' )[ 1 ].LiveValidator ).toBeUndefined();
    } );
};
