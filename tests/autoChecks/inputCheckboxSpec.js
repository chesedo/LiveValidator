var autoChecks = autoChecks || {};

autoChecks.inputCheckboxSpec = function() {
    beforeEach( function() {
        var instance = new LiveValidator.AutoChecks( helper.autoChecks.createInput( 'checkbox' ) );
        this.checks = instance.getChecks();
    } );

    it( 'not to have `min`', function() {
        expect( this.checks ).not.toContain( { min: 1 } );
    } );

    it( 'not to have `max`', function() {
        expect( this.checks ).not.toContain( { max: 10 } );
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
