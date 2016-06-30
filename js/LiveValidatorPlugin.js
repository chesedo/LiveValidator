;( function( $, window, document, undefined ) {
    /**
     * Name of the plugin that is used when setting the data
     *
     * @type {String}
     */
    var pluginName = 'LiveValidator';

    $.fn[ pluginName ] = function() {
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
                $.data( this, pluginName, 'data-value' );
            } );
    };
} )( jQuery, window, document );
