var LiveValidator = function( $, element, options ) {

    // Stores a reference to jQuery
    this.jq = $;

    // Store a reference to this input
    this.element = element;
    this.$element = this.jq( element );

    // Check if required attribute is set
    // IE9 does not support the :required selector
    var required = this.$element.is( '[required] ' );

    // Get the options for this element by extending the defaults with detected required (above),
    // those set on data and those passed in
    this.options = this.jq.extend(
        true,
        {},
        this.jq.fn.LiveValidator.defaults,
        { required: required },
        this.$element.data(),
        options
    );
};

LiveValidator.prototype = {
    /**
     * Check if a theme is valid by making sure it has the required methods
     *
     * @param  {function} theme The theme `class` to checkbox
     *
     * @return {boolean}        True if valid
     */
    _isValidTheme: function( theme ) {
        var requiredMethods = [ 'markRequired', 'unmarkRequired', 'setMissing', 'unsetMissing' ];
        this._log( 'Testing if theme is valid' );

        for ( var i = 0; i < requiredMethods.length; i++ ) {
            if ( typeof theme.prototype[ requiredMethods[ i ] ] !== 'function' ) {
                this._log( 'Custom theme is not valid - missing the function ' + requiredMethods[ i ] );
                return false;
            }
        }

        this._log( 'Custom theme is valid' );
        return true;
    },
    /**
     * Function that gets trigger on blur event
     *
     * @param  {event} e Event data
     */
    _blur: function( e ) {
        var value = this.$element.val(),
            trimmedValue = this.jq.trim( value );

        if ( value !== trimmedValue ) {
            this.$element.val( trimmedValue );
        }

        if ( trimmedValue === '' ) {
            if ( this.options.required ) {
                this.theme.setMissing();
                return;
            }
        } else {
            this._performChecks();
        }
        this.theme.unsetMissing();
    },
    _performChecks: function() {

    },
    _log: function( text, level ) {
        if ( this.options.debug ) {
            level = level || 2;
            console.log( this.logLevels[ level ] + ': ' + text );
        }
    }
};
