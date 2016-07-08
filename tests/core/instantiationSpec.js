var core = core || {};

core.instantiationSpec = function() {
    beforeEach( function() {
        this.options = {
            class: {
                error: 'error',
                missing: 'missing',
                parentSelector: 'row'
            },
            required: false,
            requiredHTML: '<strong style="padding-left:1em">*</strong>',
            checks: [],
            debug: false
        };
    } );

    it( 'for default options', function() {
        var instance = new LiveValidator( $, helper.bareInput() );

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for passed options', function() {
        var instance = new LiveValidator(
            $,
            helper.bareInput(),
            { required: true, class: { parentSelector: 'group' }
        } );

        this.options.required = true;
        this.options.class.parentSelector = 'group';

        expect( instance.options ).toEqual( this.options );
    } );

    it( 'for required attr set on input', function() {
        setFixtures( '<input required />' );
        var instance = new LiveValidator( $,  $( 'input' ) );

        expect( instance.options.required ).toBe( true );
    } );

    it( 'for data set on the input', function() {
        setFixtures( '<input data-required="true" data-class=\'{"parentSelector": "group"}\' />' );
        var instance = new LiveValidator( $,  $( 'input' ) );

        this.options.required = true;
        this.options.class.parentSelector = 'group';

        expect( instance.options ).toEqual( this.options );
    } );
};
