/**
 * Tests that check the plugin method calls
 */
var plugin = plugin || {};

plugin.methodsSpec = function() {
    beforeEach( function() {
        this.setRequired = spyOn( LiveValidator.prototype, 'setRequired' );
        this._blur = spyOn( LiveValidator.prototype, '_blur' );
    } );

    it( 'can been called through the plugin', function() {
        var input = helper.bareInput();

        input.LiveValidator();
        expect( this.setRequired ).not.toHaveBeenCalled();
        input.LiveValidator( 'setRequired' );
        expect( this.setRequired ).toHaveBeenCalled();
        expect( this.setRequired ).toHaveBeenCalledWith();
    } );

    it( 'can been called through the plugin with options', function() {
        var input = helper.bareInput();

        input.LiveValidator();
        expect( this.setRequired ).not.toHaveBeenCalled();
        input.LiveValidator( 'setRequired', true );
        expect( this.setRequired ).toHaveBeenCalled();
        expect( this.setRequired ).toHaveBeenCalledWith( true );
    } );

    it( 'can not be called as an array', function() {
        var input = helper.bareInput();

        input.LiveValidator();
        expect( this.setRequired ).not.toHaveBeenCalled();
        input.LiveValidator( [ 'setRequired' ] );
        expect( this.setRequired ).not.toHaveBeenCalled();
    } );

    it( 'can not call a private function (should still return input)', function() {
        var input = helper.bareInput();

        input.LiveValidator();
        expect( this._blur ).not.toHaveBeenCalled();
        input.LiveValidator( [ '_blur' ] );
        expect( this._blur ).not.toHaveBeenCalled();
    } );

    it( 'can not call a non-existing function (should still return input)', function() {
        var input = helper.bareInput();

        input.LiveValidator();
        expect( input.LiveValidator( 'nonExisting' )[ 0 ] ).toEqual( input );
    } );

    it( 'can not call on a non-instantiated input (should still return input)', function() {
        var input = helper.bareInput();

        expect( input.LiveValidator( 'nonExisting' )[ 0 ] ).toEqual( input );
    } );
};
