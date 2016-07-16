var autoChecks = autoChecks || {};

autoChecks.inputPasswordSpec = function() {
    beforeEach( function() {
        var instance = new LiveValidator.AutoChecks( helper.autoChecks.createInput( 'password' ) );
        this.checks = instance.getChecks();
    } );

    it( 'not to have `min`', function() {
        expect( this.checks ).not.toContain( { min: 1 } );
    } );

    it( 'not to have `max`', function() {
        expect( this.checks ).not.toContain( { max: 10 } );
    } );

    it( 'to have `minlength`', function() {
        expect( this.checks ).toContain( { minlength: 1 } );
    } );

    it( 'to have `maxlength`', function() {
        expect( this.checks ).toContain( { maxlength: 2 } );
    } );

    it( 'to have `pattern`', function() {
        expect( this.checks ).toContain( { pattern: { regex: 'a-z', title: 'Helper title' } } );
    } );
};
