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
                if ( obj.hasOwnProperty( key ) && obj[ key ] !== null ) {
                    if ( obj[ key ].toString() ===  '[object Object]' ) {
                        out[ key ] = LiveValidator.utils.extend( out[ key ], obj[ key ] );
                    } else if ( obj[ key ].constructor.name === 'Array' ) {
                        out[ key ] = obj[ key ].slice();
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
