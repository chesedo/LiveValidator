// Get namespace ready
var LiveValidator = LiveValidator || {};
LiveValidator.themes = LiveValidator.themes || {};

LiveValidator.themes.Bootstrap3Popover = function Bootstrap3PopoverTheme( element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.themes.Bootstrap3Popover ) ) {
        return new LiveValidator.themes.Bootstrap3Popover( element, options );
    }

    // Call parent (Bootstrap3) constructor
    LiveValidator.themes.Bootstrap3.call(
        this,
        element,
        LiveValidator.utils.extend(
            {},
            { popover: {
                html: true,
                placement: 'bottom',
                trigger: 'focus',
                title: 'Keep these in mind'
            } },
            options
        )
    );

    this.errors = null;
    $( this.element ).popover( this.options.popover );
    this.popover = $( this.element ).data( 'bs.popover' );

    // Prevent popover from being displayed when there are no errors - title triggers this to happen
    this.options.popover.trigger.split( ' ' ).forEach( function( event ) {

        // Change hover event to mouseenter if needed
        event = event === 'hover' ? 'mouseenter' : event;
        this.element.addEventListener( event, function() {
            if ( !this.errors ) {
                this.popover.hide();
            }
        }.bind( this ) );
    }.bind( this ) );
};

// Inherit methods from Bootstrap3
LiveValidator.themes.Bootstrap3Popover.prototype = Object.create( LiveValidator.themes.Bootstrap3.prototype );
LiveValidator.themes.Bootstrap3Popover.prototype.constructor = LiveValidator.themes.Bootstrap3Popover;

LiveValidator.themes.Bootstrap3Popover.prototype.clearErrors = function() {
    LiveValidator.utils.removeClass( this.parentEl, this.options.error );
    this.element.dataset.content = '';
    this.popover.hide();
};
LiveValidator.themes.Bootstrap3Popover.prototype.addErrors = function( errors ) {

    // Create this.errors for popover
    this.errors = errors.join( '<br>' );

    // Set content and show popover
    this.element.dataset.content = this.errors;
    this.popover.tip().find( '.popover-content' ).html( this.errors );
    LiveValidator.utils.addClass( this.parentEl, this.options.error );

    // Only show popover if element has focus and popover not shown
    if ( this.parentEl && this.element === document.activeElement && !this.parentEl.querySelector( '.popover' ) ) {
        this.popover.show();
    }
};
