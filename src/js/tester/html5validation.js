/**
 * This adds the testers for the auto checks detector
 */

LiveValidator.Tester.prototype.min = function( value, min ) {
    if ( this.isNumber( value ) ) {
        if ( value < min ) {
            this.addError( this.getMessage( 'minNumber' ).replace( '%d', min ) );
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
            this.addError( this.getMessage( 'maxNumber' ).replace( '%d', max ) );
            return false;
        } else {
            return true;
        }
    }
    return false;
};

LiveValidator.Tester.prototype.minlength = function( value, min ) {
    if ( value.length < min ) {
        this.addError( this.getMessage( 'minlength' ).replace( '%d', min ) );
        return false;
    } else {
        return true;
    }
};

LiveValidator.Tester.prototype.maxlength = function( value, max ) {
    if ( value.length > max ) {
        this.addError( this.getMessage( 'maxlength' ).replace( '%d', max ) );
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
        this.addError( this.getMessage( 'beNumber' ) );
        return false;
    } else {
        return true;
    }
};
