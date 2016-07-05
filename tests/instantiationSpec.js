describe( 'Check that the instantiation is correct', function() {
    var bareInput = function() {
        setFixtures( '<input />' );
        return $( 'input' );
    };

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
        var input = bareInput();

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator.options ).toEqual( this.options );
    } );

    it( 'for passed options', function() {
        var input = bareInput();

        this.options.required = true;
        this.options.class.parentSelector = 'group';

        input.LiveValidator( { required: true, class: { parentSelector: 'group' } } );
        expect( $.data( input[ 0 ] ).LiveValidator.options ).toEqual( this.options );
    } );

    it( 'for required attr set on input', function() {
        setFixtures( '<input required />' );
        var input = $( 'input' );

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator.options.required ).toBe( true );
    } );

    it( 'for data set on the input', function() {
        setFixtures( '<input data-required="true" data-class=\'{"parentSelector": "group"}\' />' );
        var input = $( 'input' );

        this.options.required = true;
        this.options.class.parentSelector = 'group';

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator.options ).toEqual( this.options );
    } );

    it( 'when plugin is initiated twice', function() {
        var input = bareInput();

        input.LiveValidator();
        input.LiveValidator( { required: true } );
        expect( $.data( input[ 0 ] ).LiveValidator.options ).toEqual( this.options );
    } );

    it( 'when system-wide overrites are set', function() {
        var input = bareInput();

        $.fn.LiveValidator.defaults.requiredHTML = '*';
        $.fn.LiveValidator.defaults.class.parentSelector = 'group';

        this.options.requiredHTML = '*';
        this.options.class.parentSelector = 'group';

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator.options ).toEqual( this.options );
    } );

    it( 'when system-wide overrites are set through plugin', function() {
        var input = bareInput();

        $.LiveValidator( {
            requiredHTML: '*',
            class: {
                parentSelector: 'group'
            }
        } );

        this.options.requiredHTML = '*';
        this.options.class.parentSelector = 'group';

        input.LiveValidator();
        expect( $.data( input[ 0 ] ).LiveValidator.options ).toEqual( this.options );
    } );
} );
