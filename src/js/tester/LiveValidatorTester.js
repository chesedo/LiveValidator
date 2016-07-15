// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.Tester = function() {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.Tester ) ) {
        return new LiveValidator.Tester();
    }

    this.errors = [];
};

LiveValidator.Tester.prototype.clearErrors = function() {
    this.errors = [];
};

LiveValidator.Tester.prototype.addError = function( error ) {
    this.errors.push( error );
};

LiveValidator.Tester.prototype.getErrors = function() {
    return this.errors;
};
