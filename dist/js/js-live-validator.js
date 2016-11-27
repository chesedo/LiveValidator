// Get namespace ready
var LiveValidator = LiveValidator || {};

// Stores the defaults for the plugin - allow a system-wide overrite
LiveValidator.defaults =  {
    themeData: {},
    required: false,
    liveEnabled: true,
    checks: [],
    locale: 'en-us',
    debug: false
};

LiveValidator.name = 'LiveValidator';

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
    this.tester = new LiveValidator.Tester( this.options.locale );

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
            this.theme.markRequired();
        } else {
            this.theme.unmarkRequired();
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

        var validChecks = checks.filter( function( check ) {

            // Check if it is a check that has parameters
            if ( typeof check === 'object' ) {
                check = Object.keys( check )[ 0 ];
            }

            // Check if check is declared in tester
            if ( typeof this.tester[ check ] === 'function' ) {

                // Check for duplicate
                return seen.hasOwnProperty( check ) ? false :  seen[ check ] = true;
            } else {
                this._log( '`' + check + '` check does not exist so it will not be added to checks' );
                return false;
            }
        }, this );

        this._log( 'Valid checks are: ' + Object.keys( seen ) );
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
                this.theme.setMissing();
                this.theme.clearErrors();
                return;
            }
            this._log( 'Input is empty and not required', 2 );
            this.theme.unsetMissing();
            this.theme.clearErrors();
        } else {
            this.theme.unsetMissing();
            this._log( 'Input has data so will perform checks', 2 );
            this._performChecks( trimmedValue );
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
            this._blur();
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
            this._blur();
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

/* globals HTMLElement, HTMLCollection, NodeList */

// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.Plugin = function LiveValidatorPlugin( options ) {

    // If this is only to change the defaults
    if ( this.name === 'LiveValidator' || this instanceof Function ) {
        LiveValidator.utils.extend( LiveValidator.defaults, options );
        return;
    }

    // Check if options are valid before continuing
    if ( options !== undefined && !( typeof options === 'object' && options.constructor.name !== 'Array' ) ) {
        return false;
    }

    /**
    * Filtering used to prevent plugin to bind to unsupported inputs
    *
    * @type {String}
    */
    var validInputsFilter = 'input:not([type="button"])' +
    ':not([type="file"])' +
    ':not([type="hidden"])' +
    ':not([type="image"])' +
    ':not([type="radio"])' +
    ':not([type="reset"])' +
    ':not([type="submit"])' +
    ', textarea';

    /**
    * Holds all valid inputs
    *
    * @type  {array}
    */
    var validInputs = [];

    /**
     * Holds the prepared elements
     *
     * @type {Array}
     */
    var elements = [];

    // Get inputs ready if this is an HTMLElement
    if ( this instanceof HTMLElement ) {
        elements = [ this ];
    }

    // Else get input ready if this is HTMLCollection
    else if ( this instanceof HTMLCollection || this instanceof NodeList || this instanceof jQuery ) {
        elements = [].slice.call( this );
    }

    // Filter all elements
    validInputs = elements.filter( function( element ) {
        return element.matches( validInputsFilter );
    } );

    // Get inner inputs
    validInputs = [].concat.apply( validInputs, elements.map( function( element ) {
        return [].slice.call( element.querySelectorAll( validInputsFilter ) );
    } ) );

    // Create core instance on each inputs
    validInputs.forEach( function( input ) {

        // Only set when not already set
        if ( !input.LiveValidator ) {
            input.LiveValidator = new LiveValidator.Core( input, options );
        }
    } );

    // Closure to allow calling methods on the input instances as a whole
    function callMethod( method, args ) {

        // Call the method on each input
        validInputs.forEach( function( input ) {
            var instance = input.LiveValidator;

            // If this was destroy - then also remove the instance
            if ( method === 'destroy' ) {
                instance.destroy();
                delete input.LiveValidator;
            } else {
                instance[ method ].apply( instance, args );
            }
        } );
    }

    return {
        getInputs: function() {
            return validInputs;
        },
        isValid: function() {

            // Assume is valid
            var valid = true;

            // Check for each input
            validInputs.forEach( function( input ) {

                // All invalid when one is invalid
                if ( !input.LiveValidator.isValid() ) {
                    valid = false;
                }
            } );

            return valid;
        },
        setRequired: function() { callMethod( 'setRequired', arguments ); },
        unsetRequired: function() { callMethod( 'unsetRequired' ); },
        enableLive: function() { callMethod( 'enableLive', arguments ); },
        disableLive: function() { callMethod( 'disableLive' ); },
        addChecks: function() { callMethod( 'addChecks', arguments ); },
        removeAllChecks: function() { callMethod( 'removeAllChecks' ); },
        removeChecks: function() { callMethod( 'removeChecks', arguments ); },
        destroy: function() {
            callMethod( 'destroy' );
            validInputs = [];
        }
    };
};

// Add to some element prototypes for easy calling
HTMLElement.prototype.getLiveValidator = LiveValidator.Plugin;
HTMLCollection.prototype.getLiveValidator = LiveValidator.Plugin;
NodeList.prototype.getLiveValidator = LiveValidator.Plugin;

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

// Get namespace ready
var LiveValidator = LiveValidator || {};
LiveValidator.translations = LiveValidator.translations || {};

LiveValidator.translations[ 'en-us' ] = {
    'minNumber': 'Should be more than or equal %d',
    'maxNumber': 'Should be less than or equal %d',
    'minlength': 'Should be %d characters or more',
    'maxlength': 'Should be %d characters or less',
    'beNumber': 'Value should be a number',
    'default': 'There is an unspecified error with this input'
};

/* globals Element */

// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.utils = {
    /**
     * Function to extend object - used in place of jQuery's extend()
     * Will always deep extend the first passed object
     */
    extend: function( out ) {
        out = out || {};

        for ( var i = 1; i < arguments.length; i++ ) {
            var obj = arguments[ i ];

            if ( !obj ) {
                continue;
            }

            for ( var key in obj ) {
                /* istanbul ignore else  */
                if ( obj.hasOwnProperty( key ) ) {
                    if ( obj[ key ].toString() ===  '[object Object]' ) {
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
     *
     * @param {Element} The element to get the data from
     *
     * @return {Object} An object with the data in JSON
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
     * Get the parent of element based on a selector
     *
     * @param {Element} Element to start from (who's parent we are searching)
     * @param {string}  The selector to match the parent against
     *
     * @return {Element} Returns the parent element if found, else null if non found;
     */
    parentSelector: function( element, parentSel ) {
        element = element.parentElement;
        while ( element ) {
            if ( element.matches( parentSel ) ) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    },
    /**
     * Add a class to the element depending on browser support
     *
     * @param {Element} The element to add the class to
     * @param {string}  The class to add
     */
    addClass: function( element, className ) {
        if ( element instanceof Element ) {
            /* istanbul ignore else  */
            if ( element.classList ) {
                element.classList.add( className );
            } else {
                element.className += ' ' + className;
            }
            return true;
        }
        return false;
    },
    /**
     * Remove a class from the element depending on browser support
     *
     * @param {Element} The element to remove the class from
     * @param {string}  The class to remove
     */
    removeClass: function( element, className ) {
        if ( element instanceof Element ) {
            /* istanbul ignore else  */
            if ( element.classList ) {
                element.classList.remove( className );
            } else {
                element.className = element.className.replace(
                    new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
            }
            return true;
        }
        return false;
    },
    /**
     * Remove a child element from this element if the child can be found (in a safe way)
     *
     * @param {Element} The element to remove the child from
     * @param {string}  A selector for the child element
     */
    removeChild: function( element, childSelector ) {
        if ( element instanceof Element ) {
            var child =  element.querySelector( childSelector );
            if ( child ) {
                return element.removeChild( child );
            }
        }
        return null;
    },
    /**
     * Add child (element) to an element only if the element is valid
     *
     * @param {Element} The element to add the child to
     * @param {Element} The child element to add
     */
    appendChild: function( element, child ) {
        if ( element instanceof Element ) {
            return element.appendChild( child );
        }
        return null;
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
        /* istanbul ignore next  */
        function( s ) {
            var matches = ( this.document || this.ownerDocument ).querySelectorAll( s ),
                i = matches.length;
            while ( --i >= 0 && matches.item( i ) !== this ) {}
            return i > -1;
        };
}
