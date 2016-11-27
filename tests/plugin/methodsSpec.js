/**
 * Tests that check the plugin method calls
 */
var plugin = plugin || {};

plugin.methodsSpec = function() {
    beforeEach( function() {
        this.setRequired = spyOn( LiveValidator.Core.prototype, 'setRequired' );
        this.unsetRequired = spyOn( LiveValidator.Core.prototype, 'unsetRequired' );
        this.enableLive = spyOn( LiveValidator.Core.prototype, 'enableLive' );
        this.disableLive = spyOn( LiveValidator.Core.prototype, 'disableLive' );
        this.addChecks = spyOn( LiveValidator.Core.prototype, 'addChecks' );
        this.removeAllChecks = spyOn( LiveValidator.Core.prototype, 'removeAllChecks' );
        this.removeChecks = spyOn( LiveValidator.Core.prototype, 'removeChecks' );
        this.isValid = spyOn( LiveValidator.Core.prototype, 'isValid' );
        this.destroy = spyOn( LiveValidator.Core.prototype, 'destroy' );
        this._blur = spyOn( LiveValidator.Core.prototype, '_blur' );
    } );

    it( 'setRequired can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.setRequired ).not.toHaveBeenCalled();
        inputValidation.setRequired();
        expect( this.setRequired ).toHaveBeenCalled();
        expect( this.setRequired ).toHaveBeenCalledWith();
    } );

    it( 'setRequired can be called with options', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.setRequired ).not.toHaveBeenCalled();
        inputValidation.setRequired( true );
        expect( this.setRequired ).toHaveBeenCalled();
        expect( this.setRequired ).toHaveBeenCalledWith( true );
    } );

    it( 'unsetRequired can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.unsetRequired ).not.toHaveBeenCalled();
        inputValidation.unsetRequired();
        expect( this.unsetRequired ).toHaveBeenCalled();
        expect( this.unsetRequired ).toHaveBeenCalledWith();
    } );

    it( 'enableLive can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.enableLive ).toHaveBeenCalledTimes( 1 );
        inputValidation.enableLive();
        expect( this.enableLive ).toHaveBeenCalledTimes( 2 );
        expect( this.enableLive ).toHaveBeenCalledWith();
    } );

    it( 'enableLive can be called with options', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.enableLive ).toHaveBeenCalledTimes( 1 );
        inputValidation.enableLive( true );
        expect( this.enableLive ).toHaveBeenCalledTimes( 2 );
        expect( this.enableLive ).toHaveBeenCalledWith( true );
    } );

    it( 'disableLive can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.disableLive ).not.toHaveBeenCalled();
        inputValidation.disableLive();
        expect( this.disableLive ).toHaveBeenCalled();
        expect( this.disableLive ).toHaveBeenCalledWith();
    } );

    it( 'addChecks can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.addChecks ).not.toHaveBeenCalled();
        inputValidation.addChecks( [ 'check' ] );
        expect( this.addChecks ).toHaveBeenCalled();
        expect( this.addChecks ).toHaveBeenCalledWith( [ 'check' ] );
    } );

    it( 'removeAllChecks can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.removeAllChecks ).not.toHaveBeenCalled();
        inputValidation.removeAllChecks();
        expect( this.removeAllChecks ).toHaveBeenCalled();
        expect( this.removeAllChecks ).toHaveBeenCalledWith();
    } );

    it( 'removeChecks can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.removeChecks ).not.toHaveBeenCalled();
        inputValidation.removeChecks( [ 'check' ] );
        expect( this.removeChecks ).toHaveBeenCalled();
        expect( this.removeChecks ).toHaveBeenCalledWith( [ 'check' ] );
    } );

    it( 'isValid can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.isValid ).not.toHaveBeenCalled();
        inputValidation.isValid();
        expect( this.isValid ).toHaveBeenCalled();
        expect( this.isValid ).toHaveBeenCalledWith();
    } );

    it( 'destroy can be called', function() {
        var inputValidation = helper.bareInput().getLiveValidator();

        expect( this.destroy ).not.toHaveBeenCalled();
        inputValidation.destroy();
        expect( this.destroy ).toHaveBeenCalled();
        expect( this.destroy ).toHaveBeenCalledWith();
    } );
};
