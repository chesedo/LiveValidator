;( function( $, window, document, undefined ) {
    /**
     * Name of the plugin that is used when setting the data
     *
     * @type {String}
     */
    var pluginName = 'LiveValidator';

    $[ pluginName ] = $.fn[ pluginName ] = function( options ) {

        // If this is only to change the defaults
        if ( !( this instanceof $ ) ) {
            $.extend( true, LiveValidator.defaults, options );
            return;
        }

        /**
         * Filtering used to prevent plugin to bind to unsupported inputs
         *
         * @type {String}
         */
        var validInputsFilter = 'input[type!="button"]' +
                               '[type!="file"]' +
                               '[type!="hidden"]' +
                               '[type!="image"]' +
                               '[type!="radio"]' +
                               '[type!="reset"]' +
                               '[type!="submit"]' +
                          ', textarea';

        /**
         * Holds all valid inputs
         *
         * @type  {array}
         */
        var validInputs = this.filter( validInputsFilter )
                         .add( this.find( validInputsFilter ) );

        /**
         * Holds all arguments for this call to prevent out of scope issues below
         *
         * @type {array like}
         */
        var args = arguments;

        // Check if new plugin instance is to be created
        if ( options === undefined || typeof options === 'object' && options.constructor.name !== 'Array' ) {
            return validInputs.each( function() {

                // Only set when not already set
                if ( !$.data( this, pluginName ) ) {
                    $.data( this, pluginName, new LiveValidator.Core( this, options ) );
                }
            } );
        }

        // If a plugin method was called - private methods start with an underscore
        else if ( typeof options === 'string' && options[ 0 ] !== '_' ) {

            // If calling the `isValid` method
            if ( options === 'isValid' ) {

                // Assume is valid
                var valid = true;

                // Check for each input
                validInputs.each( function() {
                    var instance = $.data( this, pluginName );
                    if ( instance instanceof LiveValidator.Core ) {

                        // All invalid when one is invalid
                        if ( !instance.isValid() ) {
                            valid = false;
                        }
                    } else {

                        // Does not have plugin instance so am assuming invalid
                        valid = false;
                    }
                } );

                return valid;
            }

            // Call the method on each input
            return validInputs.each( function() {
                var instance = $.data( this, pluginName );
                if ( instance instanceof LiveValidator.Core ) {
                    if ( typeof instance[ options ] === 'function' ) {

                        // If this was destroy - then also remove the instance
                        if ( options === 'destroy' ) {
                            instance.destroy();
                            $( this ).removeData( pluginName );
                        } else {
                            instance[ options ].apply( instance, Array.prototype.slice.call( args, 1 ) );
                        }
                    } else {
                        instance._log( '`' + options + '` method does not exist on plugin', 1 );
                    }
                }
            } );
        }

        return this;
    };
} )( jQuery, window, document );

// Get namespace ready
var LiveValidator = LiveValidator || {};

// Stores the defaults for the plugin - allow a system-wide overrite
LiveValidator.defaults =  {
    themeData: {
        error: 'error',
        missing: 'missing',
        parentSelector: '.row'
    },
    required: false,
    liveEnabled: true,
    checks: [],
    debug: false
};

LiveValidator.Core = function( element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.Core ) ) {
        return new LiveValidator.Core( element, options );
    }

    // Store a reference to this input
    this.element = element;

    // Check if required attribute is set
    var required = this.element.hasAttribute( 'required' );

    // Find HTML5 validation checks on the input
    var autoChecks = new LiveValidator.AutoChecks( this.element );

    // Get the options for this element by extending the defaults with detected required (above),
    // those set on data and those passed in
    this.options = LiveValidator.utils.extend(
        {},
        LiveValidator.defaults,
        { required: required },
        { checks: autoChecks.getChecks() },
        LiveValidator.utils.getData( this.element ),
        options
    );

    // This holds the tester object which performs the tests
    this.tester = new LiveValidator.Tester();

    // Holds wheter the input is missing - blank and required
    this.missing = false;

    // This will hold all the input errors if there are any
    this.errors = [];

    // Store events so that they can be unset when needed
    this._blurEvent = this._blur.bind( this );
    this._inputEvent = this._input.bind( this );

    // Holds the debugging levels
    this.logLevels = [ 'DEBUG', 'INFO', 'ERROR' ];

    // Get the input and all the properties ready
    this._init();
};

LiveValidator.Core.prototype = {
    /**
     * Setup the plugin to be ready based on options
     */
    _init: function() {

        // Setup the needed theme
        if ( this._isValidTheme( this.options.theme ) ) {
            this.theme = new this.options.theme( this.element, this.options.themeData );
            this._log( 'LiveValidator is using the theme ' + this.theme.constructor.name );
        } else {
            this.theme = new LiveValidator.themes.Default( this.element, this.options.themeData );
            this._log( 'LiveValidator is using the default theme' );
        }

        // Set required if needed
        if ( this.options.required ) {
            this.setRequired();
        } else {
            this.unsetRequired();
        }

        // Set if live is enabled
        if ( this.options.liveEnabled ) {
            this.enableLive();
        } else {
            this.disableLive();
        }

        // Bind `blur` function
        this._log( 'Binding the blur event', 2 );
        this.element.addEventListener( 'blur', this._blurEvent );

        // Filter checks to remove duplicates and invalids/undeclared
        this.options.checks = this._filterChecks( this.options.checks );
    },
    /**
    * Check if a theme is valid by making sure it has the required methods
    *
    * @param  {function} theme The theme `class` to check
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
        this._log( 'Testing if theme is valid', 2 );

        if ( typeof theme !== 'function' ) {
            this._log( 'Custom theme is not a function', 3 );
            return false;
        }

        for ( var i = 0; i < requiredMethods.length; i++ ) {
            if ( typeof theme.prototype[ requiredMethods[ i ] ] !== 'function' ) {
                this._log( 'Custom theme is not valid - missing the function `' + requiredMethods[ i ] + '`', 2 );
                return false;
            }
        }

        this._log( 'Custom theme is valid', 2 );
        return true;
    },
    /**
     * Filter the checks to contain only those defined/declared on LiveValidator.Tester and remove duplicates
     *
     * @param  {array} checks Checks to Filter
     *
     * @return {array}        Array of valid checks
     */
    _filterChecks: function( checks ) {
        var seen = {};

        this._log( 'Filtering checks', 2 );

        if ( checks.constructor.name !== 'Array' ) {
            this._log( 'Checks is not an array; cannot use it', 3 );
            return [];
        }

        var validArr = [];
        var validChecks = checks.filter( function( check ) {

            // Check if it is a check that has parameters
            if ( typeof check === 'object' ) {
                check = Object.keys( check )[ 0 ];
            }

            // Check if check is declared in tester
            if ( typeof this.tester[ check ] === 'function' ) {

                // Check for duplicate
                return seen.hasOwnProperty( check ) ? false :  seen[ check ] = true && validArr.push( check );
            } else {
                this._log( '`' + check + '` check does not exist so it will not be added to checks' );
                return false;
            }
        }, this );

        this._log( 'Valid checks are: ' + validArr );
        return validChecks;
    },
    /**
     * Function that gets triggered on blur event
     */
    _blur: function() {
        var value = this.element.value,
            trimmedValue = value.trim();

        this._log( 'Blur triggered' );

        // Update value if trim was successful
        if ( value !== trimmedValue ) {
            this.element.value = trimmedValue;
            this._log( 'Trimed spaces from input', 2 );
        }

        // Assume not missing
        this.missing = false;

        if ( trimmedValue === '' ) {
            if ( this.options.required ) {
                this._log( 'Input is empty and required', 2 );
                this.missing = true;
            }
            this._log( 'Input is empty and not required', 2 );
            this.theme.clearErrors();
        } else {
            this._log( 'Input has data so will perform checks', 2 );
            this._performChecks( trimmedValue );
        }

        // Update missing state
        if ( this.missing ) {
            this.theme.setMissing();
        } else {
            this.theme.unsetMissing();
        }
    },
    /**
     * Function that gets triggered on input event
     */
    _input: function() {
        var value = this.element.value;

        // Cannot do checks on empty value
        if ( value !== '' ) {
            this._log( 'Value not empty so will perform checks', 2 );
            this._performChecks( value );
        } else {
            this._log( 'Value is empty so am removing errors', 2 );
            this.theme.clearErrors();
        }
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
            var check = this.options.checks[ i ],
                params = null;

            // Check if it is a check with parameters
            if ( typeof check === 'object' ) {
                params = check[ check = Object.keys( check )[ 0 ] ];
            }
            this.tester[ check ]( value, params );
            this._log( 'Performed check `' + check + '`', 2 );
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

        this._log( 'Input is now required' );

        this.options.required = true;
        this.theme.markRequired();

        if ( doCheck ) {
            this._log( 'Checking input after making it required', 2 );
            this._blur.apply( this );
        }
    },
    /**
     * Public method to change input to not required state
     */
    unsetRequired: function() {
        this._log( 'Input is now not required' );
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

        this._log( 'Live checking is now enabled' );
        this.liveEnabled = true;

        // Bind to the input event
        this.element.addEventListener( 'input', this._inputEvent );

        if ( doCheck ) {
            this._log( 'Performing checks after enabling live checking', 2 );
            this._performChecks( this.element.value );
        }
    },
    /**
     * Unbind the checks so that they are not run on the `input` event
     */
    disableLive: function() {
        this._log( 'Live checking is now disabled' );
        this.liveEnabled = false;
        this.element.removeEventListener( 'input', this._inputEvent );
    },
    /**
     * Add extra checks to the current ones
     *
     * @param  {array} checks Array of checks to add
     */
    addChecks: function( checks ) {
        this._log( 'Will now try to add checks: ' + checks );

        // Add with current
        var allChecks = this.options.checks.concat( checks );

        // Filter all the checks
        this.options.checks = this._filterChecks( allChecks );
    },
    /**
     * Removes all the set checks; plugin will not be doing any checking
     */
    removeAllChecks: function() {
        this._log( 'All check are now removed' );
        this.options.checks = [];
    },
    /**
     * Remove a set of checks from checks
     *
     * @param  {array} checks Array of checks to remove
     */
    removeChecks: function( checks ) {
        this._log( 'Will now try to remove checks: ' + checks );

        // Make sure checks is an array
        if ( !Array.isArray( checks ) ) {
            this._log( 'removeChecks can not handle a non-array element', 3 );
            return;
        }

        this.options.checks = this.options.checks.filter( function( check ) {
            return checks.indexOf( check ) === -1;
        } );
    },
    /**
     * Returns whether input is valid based on checks and if required
     *
     * @return {boolean} True if valid
     */
    isValid: function() {
        this._log( 'Checking if input is valid' );

        // Rerun checks first
        this._blur();

        return this.errors.length === 0 && !this.missing;
    },
    /**
     * Destroyes this plugin instance
     */
    destroy: function() {
        this._log( 'Destroying plugin instance and reseting the input\'s state' );

        this.element.removeEventListener( 'blur', this._blurEvent );
        this.element.removeEventListener( 'input', this._inputEvent );
        this.theme.clearErrors();
        this.theme.unsetMissing();
    },
    /**
     * Internal function used for loggin purposes when debugging is enabled
     *
     * @param  {string} text  Text to log
     * @param  {int}    level The debugging level it belongs to (default: 1)
     */
    _log: function( text, level ) {
        if ( typeof level === 'undefined' ) {
            level = 1;
        }
        if ( level <= this.options.debug ) {
            console.log( this.logLevels[ --level ] + ': ' + text );
        }
    }
};

/**
 * Try to detect checks based on some input attributes ( to 'polyfill' for browsers not supporting them )
 * Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */

// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.AutoChecks = function( element ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.AutoChecks ) ) {
        return new LiveValidator.AutoChecks( element );
    }

    this.element = element;
    this.checks = [];

    // TODO: date-time input also have `min` and `max` support which is still missing
    // Types of inputs to look for in each group
    this.types = {
        numerics: [ 'number', 'range' ],
        text: [ 'email', 'password', 'search', 'tel', 'text', 'url' ]
    };
};

LiveValidator.AutoChecks.prototype = {
    /**
     * Get the checks for this input
     *
     * @return {Array} Array of checks detected with their parameters
     */
    getChecks: function() {
        var type = this.element.type;

        if ( this.types.numerics.indexOf( type ) !== -1 ) {
            this._filterNumeric();
        }

        if ( this.types.text.indexOf( type ) !== -1 ) {
            this._filterText();
        }

        return this.checks;
    },
    /**
     * Check for `min` and `max` attributes on numeric inputs
     */
    _filterNumeric: function() {
        this._addCheck( 'min' );
        this._addCheck( 'max' );
    },
    /**
     * Check for `minlength`, `maxlength` and `pattern` attributes on "text" inputs
     */
    _filterText: function() {
        this._addCheck( 'minlength' );
        this._addCheck( 'maxlength' );

        if ( this.element.hasAttribute( 'pattern' ) ) {
            var params = {};
            params.regex = this.element.getAttribute( 'pattern' );
            params.title = this.element.getAttribute( 'title' );
            this.checks.push( { 'pattern':  params } );
        }
    },
    /**
     * Try to find the 'check' attribute and add its check if it exists
     *
     * @param  {string} check The attribte to look for. Eg. `min`
     */
    _addCheck: function( check ) {
        if ( this.element.hasAttribute( check ) ) {
            var checkObj = {};
            checkObj[ check ] = parseInt( this.element.getAttribute( check ) );
            this.checks.push( checkObj );
        }
    }
};

// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.Tester = function() {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.Tester ) ) {
        return new LiveValidator.Tester();
    }

    this.errors = [];
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

/* globals Element */

// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.utils = {
    /**
     * Function to extend object - used in place of jQuery's extend()
     */
    extend: function( out ) {
        out = out || {};

        for ( var i = 1; i < arguments.length; i++ ) {
            var obj = arguments[ i ];

            if ( !obj ) {
                continue;
            }

            for ( var key in obj ) {
                if ( obj.hasOwnProperty( key ) ) {
                    if ( Object.prototype.toString.call( obj[ key ] ) ===  '[object Object]' ) {
                        out[ key ] = LiveValidator.utils.extend( out[ key ], obj[ key ] );
                    } else {
                        out[ key ] = obj[ key ];
                    }
                }
            }
        }

        return out;
    },
    /**
     * Function to get data from element like jQuery's data()
     */
    getData: function( element ) {
        var data = {};

        for ( var key in element.dataset ) {
            try {
                data[ key ] = JSON.parse( element.dataset[ key ] );
            } catch ( e ) {
                data[ key ] = element.dataset[ key ];
            }
        }

        return data;
    },
    /**
     * Get the parent of element based on function
     */
    parentSelector: function( element, parentSel ) {
        while ( element ) {
            if ( element.matches( parentSel ) ) {
                return element;
            }
            element = element.parentElement;
        }
    },
    /**
     * Add a class to the element depending on browser support
     */
    addClass: function( element, className ) {
        if ( element instanceof Element ) {
            if ( element.classList ) {
                element.classList.add( className );
            } else {
                element.className += ' ' + className;
            }
        }
    },
    /**
     * Remove a class from the element depending on browser support
     */
    removeClass: function( element, className ) {
        if ( element instanceof Element ) {
            if ( element.classList ) {
                element.classList.remove( className );
            } else {
                element.className = element.className.replace(
                    new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
            }
        }
    },
    /**
     * Remove a child element from this element if the child can be found
     */
    removeChild: function( element, childSelector ) {
        if ( element instanceof Element ) {
            var child =  element.querySelector( childSelector );
            if ( child ) {
                element.removeChild( child );
            }
        }
    },
    /**
     * Add child to element if the element is valid
     */
    appendChild: function( element, child ) {
        if ( element instanceof Element ) {
            element.appendChild( child );
        }
    }
};

// Element.matches polyfill from https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
if ( !Element.prototype.matches ) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function( s ) {
            var matches = ( this.document || this.ownerDocument ).querySelectorAll( s ),
                i = matches.length;
            while ( --i >= 0 && matches.item( i ) !== this ) {}
            return i > -1;
        };
}
