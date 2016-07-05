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
        var validInputs = 'input[type!="button"]' +
                               '[type!="file"]' +
                               '[type!="hidden"]' +
                               '[type!="image"]' +
                               '[type!="radio"]' +
                               '[type!="reset"]' +
                               '[type!="submit"]' +
                          ', textarea';
        return this
            .filter( validInputs )
            .add( this.find( validInputs ) )
            .each( function() {

                // Only set when not already set
                if ( !$.data( this, pluginName ) ) {
                    $.data( this, pluginName, new LiveValidator( $, this, options ) );
                }
            } );
    };

    // Stores the defaults for the plugin - allow a system-wide overrite
    $.fn[ pluginName ].defaults =  {
        class: {
            error: 'error',
            missing: 'missing',
            parentSelector: 'row'
        },
        required: false,
        requiredHTML: '<strong style="padding-left:1em">*</strong>',
        checks: [],
        debug: false
    };
} )( jQuery, window, document );
