var LiveValidator = function( $, element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator ) ) {
        return new LiveValidator( $, element, options );
    }

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

    // This holds the tester object which performs the tests
    this.tester = new LiveValidatorTester();

    // This will hold all the input errors if there are any
    this.errors = [];
};

LiveValidator.prototype = {
    /**
     * Filter the checks to contain only those defined/declared on LiveValidatorTester and remove duplicates
     */
    _filterChecks: function() {
        var seen = {};
        return this.options.checks.filter( function( check ) {

            // Check if check is declared in tester
            if ( typeof this.tester[ check ] === 'function' ) {

                // Remove duplicates
                return seen.hasOwnProperty( check ) ? false : ( seen[ check ] = true );
            } else {
                this._log( '`' + check + '` check does not exist so it is removed from checks' );
                return false;
            }
        }, this );
    },
    /**
     * Check if a theme is valid by making sure it has the required methods
     *
     * @param  {function} theme The theme `class` to checkbox
     *
     * @return {boolean}        True if valid
     */
    _isValidTheme: function( theme ) {
        var requiredMethods = [
            'markRequired',
            'unmarkRequired',
            'setMissing',
            'unsetMissing',
            'clearErrors',
            'addErrors'
        ];
        this._log( 'Testing if theme is valid' );

        if ( typeof theme !== 'function' ) {
            this._log( 'Custom theme is not a function' );
            return false;
        }

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
            this._performChecks( trimmedValue );
        }
        this.theme.unsetMissing();
    },
    /**
     * Performs the set checks on the input value
     *
     * @param  {string} value Value to run checks on
     */
    _performChecks: function( value ) {

        // Clear all errors
        this.tester.clearErrors();

        // Loop over all the checks
        for ( var i = 0; i < this.options.checks.length; i++ ) {
            var check = this.options.checks[ i ];
            this.tester[ check ]( value );
        }

        // Get all the errors from tester
        this.errors = this.tester.getErrors();

        // Update theme based on errors
        if ( this.errors.length === 0 ) {
            this.theme.clearErrors();
        } else {
            this.theme.addErrors( this.errors );
        }
    },
    /**
     * Public method to change the input to required state
     *
     * @param  {boolean} doCheck Should it recheck if input is empty (default: false)
     */
    setRequired: function( doCheck ) {
        doCheck = doCheck || false;

        this.options.required = true;
        this.theme.markRequired();

        if ( doCheck ) {
            this._blur.apply( this );
        }
    },
    /**
     * Public method to change input to not required state
     */
    unsetRequired: function() {
        this.options.required = false;

        this.theme.unmarkRequired();
        this.theme.unsetMissing();
    },
    /**
     * Enable the checkers by binding them to the `input` event
     *
     * @param  {boolean} doCheck Should it also perform a check (default: false)
     */
    enableLive: function( doCheck ) {
        doCheck = doCheck || false;

        this.liveEnabled = true;

        this.$element.on( 'input.LiveValidator', function() {
            this._performChecks( this.$element.val() );
        }.bind( this ) );

        if ( doCheck ) {
            this._performChecks( this.$element.val() );
        }
    },
    /**
     * Unbind the checks so that they are not run on the `input` event
     */
    disableLive: function() {
        this.liveEnabled = false;
        this.$element.off( 'input.LiveValidator' );
    },
    _log: function( text, level ) {
        if ( this.options.debug ) {
            level = level || 2;
            console.log( this.logLevels[ level ] + ': ' + text );
        }
    }
};
