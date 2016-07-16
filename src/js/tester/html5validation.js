/**
 * This adds the testers for the auto checks detector
 */

LiveValidator.Tester.prototype.min = function( value, min ) {
    if ( this.isNumber( value ) ) {
        if ( value < min ) {
            this.addError( 'Should be more than or equal %d'.replace( '%d', min ) );
            return false;
        } else {
            return true;
        }
    }

    return false;
};

LiveValidator.Tester.prototype.max = function( value, max ) {
    if ( this.isNumber( value ) ) {
        if ( value > max ) {
            this.addError( 'Should be less than or equal %d'.replace( '%d', max ) );
            return false;
        } else {
            return true;
        }
    }
    return false;
};

LiveValidator.Tester.prototype.minlength = function( value, min ) {
    if ( value.length < min ) {
        this.addError( 'Should be %d characters or more'.replace( '%d', min ) );
        return false;
    } else {
        return true;
    }
};

LiveValidator.Tester.prototype.maxlength = function( value, max ) {
    if ( value.length > max ) {
        this.addError( 'Should be %d characters or less'.replace( '%d', max ) );
        return false;
    } else {
        return true;
    }
};

LiveValidator.Tester.prototype.pattern = function( value, params ) {

    // TODO: Add the `u` - the docs state that this is used
    var regex = new RegExp( params.regex );
    if ( !regex.test( value ) ) {
        this.addError( params.title );
        return false;
    } else {
        return true;
    }
};

LiveValidator.Tester.prototype.isNumber = function( value ) {
    if ( isNaN( Number( value ) ) ) {
        this.addError( 'Value should be a number' );
        return false;
    } else {
        return true;
    }
};
