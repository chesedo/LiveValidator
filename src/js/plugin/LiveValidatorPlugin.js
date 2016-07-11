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
            $.extend( true, $.fn[ pluginName ].defaults, options );
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
                    $.data( this, pluginName, new LiveValidator( $, this, options ) );
                }
            } );
        }

        // If a plugin method was called - private methods start with an underscore
        else if ( typeof options === 'string' && options[ 0 ] !== '_' ) {

            // Call the method on each input
            return validInputs.each( function() {
                var instance = $.data( this, pluginName );
                if ( instance instanceof LiveValidator ) {
                    if ( typeof instance[ options ] === 'function' ) {
                        instance[ options ].apply( instance, Array.prototype.slice.call( args, 1 ) );
                    } else {
                        instance._log( '`' + options + '` method does not exist on plugin', 1 );
                    }
                }
            } );
        }

        return this;
    };

    // Stores the defaults for the plugin - allow a system-wide overrite
    $.fn[ pluginName ].defaults =  {
        class: {
            error: 'error',
            missing: 'missing',
            parentSelector: 'row'
        },
        required: false,
        liveEnabled: true,
        requiredHTML: '<strong style="padding-left:1em">*</strong>',
        checks: [],
        debug: false
    };
} )( jQuery, window, document );
