var autoChecks = autoChecks || {};

autoChecks.getChecksSpec = function() {
    it( 'when valid check found', function() {
        var instance = new LiveValidator.AutoChecks( helper.autoChecks.createInput( 'text' ) );

        expect( instance.getChecks() ).toContain( { minlength: 1 } );
    } );

    it( 'when no checks are found', function() {
        var instance = new LiveValidator.AutoChecks( helper.bareInput() );

        expect( instance.getChecks() ).toBe( null );
    } );
};
