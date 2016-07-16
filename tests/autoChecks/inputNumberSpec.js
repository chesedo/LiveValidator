var autoChecks = autoChecks || {};

autoChecks.inputNumberSpec = function() {
    beforeEach( function() {
        var instance = new LiveValidator.AutoChecks( helper.autoChecks.createInput( 'number' ) );
        this.checks = instance.getChecks();
    } );

    it( 'to have `min`', function() {
        expect( this.checks ).toContain( { min: 1 } );
    } );

    it( 'to have `max`', function() {
        expect( this.checks ).toContain( { max: 10 } );
    } );

    it( 'not to have `minlength`', function() {
        expect( this.checks ).not.toContain( { minlength: 1 } );
    } );

    it( 'not to have `maxlength`', function() {
        expect( this.checks ).not.toContain( { maxlength: 2 } );
    } );

    it( 'not to have `pattern`', function() {
        expect( this.checks ).not.toContain( { pattern: { regex: 'a-z', title: 'Helper title' } } );
    } );
};
