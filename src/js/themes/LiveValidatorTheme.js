var LiveValidatorTheme = function LiveValidatorTheme( $, element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidatorTheme ) ) {
        return new LiveValidatorTheme( $, element );
    }

    this.jq = $;
    this.element = element;
    this.$element = this.jq( element );
    this.options = this.jq.extend(
        true,
        {},
        options
    );

    // Holds the debugging levels
    this.logLevels = [ 'DEBUG', 'INFO', 'ERROR' ];
};

LiveValidatorTheme.prototype.markRequired = function() {
};
LiveValidatorTheme.prototype.unmarkRequired = function() {
};
LiveValidatorTheme.prototype.setMissing = function() {
};
LiveValidatorTheme.prototype.unsetMissing = function() {
};
LiveValidatorTheme.prototype.clearErrors = function() {
};
LiveValidatorTheme.prototype.addErrors = function() {
};
/**
 * Internal function used for loggin purposes when debugging is enabled
 *
 * @param  {string} text  Text to log
 * @param  {int}    level The debugging level it belongs to (default: 1)
 */
LiveValidatorTheme.prototype._log = function( text, level ) {
    if ( typeof level === 'undefined' ) {
        level = 1;
    }
    if ( level <= this.options.debug ) {
        console.log( this.logLevels[ --level ] + ': ' + text );
    }
};
