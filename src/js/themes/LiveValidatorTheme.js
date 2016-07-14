var LiveValidatorTheme = function LiveValidatorTheme( $, element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidatorTheme ) ) {
        return new LiveValidatorTheme( $, element, options );
    }

    this.jq = $;
    this.element = element;
    this.$element = this.jq( element );
    this.options = this.jq.extend(
        true,
        {},
        {
            error: 'error',
            missing: 'missing',
            parentSelector: '.row'
        },
        options
    );
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
