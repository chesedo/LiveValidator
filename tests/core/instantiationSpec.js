var core = core || {};

core.instantiationSpec = function() {
    beforeEach( function() {
        this.options = {
            themeData: {
                error: 'error',
                missing: 'missing',
                parentSelector: '.row'
            },
            required: false,
            liveEnabled: true,
            checks: [],
            debug: false
        };
    } );

    it( 'when called without `new`', function() {
        var instance = LiveValidator.Core( $, helper.bareInput() );

        expect( instance.options ).toBeDefined();
        expect( window.options ).toBeUndefined();
    } );

    it( 'for default options', function() {
        var instance = new LiveValidator.Core( $, helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for passed options', function() {
        var instance = new LiveValidator.Core(
            $,
            helper.bareInput(),
            { required: true, themeData: { parentSelector: 'group' }
        } );

        this.options.required = true;
        this.options.themeData.parentSelector = 'group';

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for required attr set on input', function() {
        var instance = new LiveValidator.Core( $,  helper.requiredInput() );

        expect( instance.options.required ).toBe( true );
    } );

    it( 'for data set on the input', function() {
        setFixtures( '<input data-required="true" data-theme-data=\'{"parentSelector": "group"}\' />' );
        var instance = new LiveValidator.Core( $,  $( 'input' ) );

        this.options.required = true;
        this.options.themeData.parentSelector = 'group';

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for input with HTML5 validation', function() {
        setFixtures( '<input type="text" maxlength="25" pattern="[a-zA-Z]" title="Only alphabetical"/>' );
        var instance = new LiveValidator.Core( $,  $( 'input' )[ 0 ] );

        expect( instance.options.checks ).toEqual( [
            { maxlength: 25 },
            { pattern: { regex: '[a-zA-Z]', title: 'Only alphabetical' } }
        ] );
    } );
};
