// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.Tester = function( locale ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.Tester ) ) {
        return new LiveValidator.Tester();
    }

    // Set default locale
    locale = locale || 'en-us';

    this.errors = [];

    // Build messages based on locale
    this.messages = {};
    if ( locale !== 'en-us' ) {

        // Extend on default in case the locale is partially complete
        LiveValidator.utils.extend(
            this.messages,
            LiveValidator.translations[ 'en-us' ],
            LiveValidator.translations[ locale ]
        );
    } else {
        LiveValidator.utils.extend( this.messages, LiveValidator.translations[ 'en-us' ] );
    }
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

LiveValidator.Tester.prototype.getMessage = function( message ) {
    return this.messages[ message ] || this.messages[ 'default' ] ;
};
