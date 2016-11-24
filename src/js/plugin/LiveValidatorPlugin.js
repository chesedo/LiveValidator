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
