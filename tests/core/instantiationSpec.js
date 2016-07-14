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
        var instance = LiveValidator( $, helper.bareInput() );

        expect( instance.options ).toBeDefined();
        expect( window.options ).toBeUndefined();
    } );

    it( 'for default options', function() {
        var instance = new LiveValidator( $, helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for passed options', function() {
        var instance = new LiveValidator(
            $,
            helper.bareInput(),
            { required: true, themeData: { parentSelector: 'group' }
        } );

        this.options.required = true;
        this.options.themeData.parentSelector = 'group';

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for required attr set on input', function() {
        var instance = new LiveValidator( $,  helper.requiredInput() );

        expect( instance.options.required ).toBe( true );
    } );

    it( 'for data set on the input', function() {
        setFixtures( '<input data-required="true" data-theme-data=\'{"parentSelector": "group"}\' />' );
        var instance = new LiveValidator( $,  $( 'input' ) );

        this.options.required = true;
        this.options.themeData.parentSelector = 'group';

        expect( instance.options ).toEqual( this.options );
    } );
};
