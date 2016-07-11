var LiveValidatorTester = function() {
    this.errors = [];
};

LiveValidatorTester.prototype.clearErrors = function() {
    this.errors = [];
};

LiveValidatorTester.prototype.addError = function( error ) {
    this.errors.push( error );
};

LiveValidatorTester.prototype.getErrors = function() {
    return this.errors;
};