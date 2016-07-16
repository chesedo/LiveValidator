// Get namespace ready
var LiveValidator = LiveValidator || {};
LiveValidator.themes = LiveValidator.themes || {};

LiveValidator.themes.Default = function LiveValidatorTheme( $, element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.themes.Default ) ) {
        return new LiveValidator.themes.Default( $, element, options );
    }

    this.jq = $;
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
    this.$parent = this.$element.parent( this.options.parentSelector );
};

LiveValidator.themes.Default.prototype.markRequired = function() {
    this.$parent.addClass( 'required' );
};
LiveValidator.themes.Default.prototype.unmarkRequired = function() {
    this.$parent.removeClass( 'required' );
};
LiveValidator.themes.Default.prototype.setMissing = function() {
    this.$parent.addClass( this.options.missing );
};
LiveValidator.themes.Default.prototype.unsetMissing = function() {
    this.$parent.removeClass( this.options.missing );
};
LiveValidator.themes.Default.prototype.clearErrors = function() {
    this.$parent.removeClass( this.options.error ).find( 'ul' ).remove();
};
LiveValidator.themes.Default.prototype.addErrors = function( errors ) {

    // Remove old errors
    this.clearErrors();

    var $ul = $( '<ul class="errors" />' );

    for ( var i = 0; i < errors.length; i++ ) {
        $ul.append( '<li>' + errors[ i ] + '</li>' );
    }

    this.$parent.append( $ul ).addClass( this.options.error );
};
