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
