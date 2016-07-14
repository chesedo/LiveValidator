var LiveValidatorTheme = function LiveValidatorTheme( $, element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidatorTheme ) ) {
        return new LiveValidatorTheme( $, element, options );
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

LiveValidatorTheme.prototype.markRequired = function() {
    this.$parent.addClass( 'required' );
};
LiveValidatorTheme.prototype.unmarkRequired = function() {
    this.$parent.removeClass( 'required' );
};
LiveValidatorTheme.prototype.setMissing = function() {
    this.$parent.addClass( this.options.missing );
};
LiveValidatorTheme.prototype.unsetMissing = function() {
    this.$parent.removeClass( this.options.missing );
};
LiveValidatorTheme.prototype.clearErrors = function() {
    this.$parent.removeClass( this.options.error ).find( 'ul' ).remove();
};
LiveValidatorTheme.prototype.addErrors = function( errors ) {

    // Remove old errors
    this.clearErrors();

    var $ul = $( '<ul class="errors" />' );

    for ( var i = 0; i < errors.length; i++ ) {
        $ul.append( '<li>' + errors[ i ] + '</li>' );
    }

    this.$parent.append( $ul ).addClass( this.options.error );
};
