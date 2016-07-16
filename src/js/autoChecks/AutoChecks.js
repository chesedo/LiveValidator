/**
 * Try to detect checks based on some input attributes ( to 'polyfill' for browsers not supporting them )
 * Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */

// Get namespace ready
var LiveValidator = LiveValidator || {};

LiveValidator.AutoChecks = function( element ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.AutoChecks ) ) {
        return new LiveValidator.AutoChecks( $, element );
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
