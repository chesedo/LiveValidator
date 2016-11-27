// Get namespace ready
var LiveValidator = LiveValidator || {};
LiveValidator.themes = LiveValidator.themes || {};

LiveValidator.themes.Bootstrap3Tooltip = function Bootstrap3TooltipTheme( element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.themes.Bootstrap3Tooltip ) ) {
        return new LiveValidator.themes.Bootstrap3Tooltip( element, options );
    }

    // Call parent (Bootstrap3) constructor
    LiveValidator.themes.Bootstrap3.call(
        this,
        element,
        LiveValidator.utils.extend(
            {},
            { tooltip: {
                html: true,
                placement: 'bottom'
            } },
            options
        )
    );

    $( this.element ).tooltip( this.options.tooltip );
    this.tooltip = $( this.element ).data( 'bs.tooltip' );
};

// Inherit methods from Bootstrap3
LiveValidator.themes.Bootstrap3Tooltip.prototype = Object.create( LiveValidator.themes.Bootstrap3.prototype );
LiveValidator.themes.Bootstrap3Tooltip.prototype.constructor = LiveValidator.themes.Bootstrap3Tooltip;

LiveValidator.themes.Bootstrap3Tooltip.prototype.clearErrors = function() {
    LiveValidator.utils.removeClass( this.parentEl, this.options.error );
    this.element.dataset.originalTitle = '';
    this.tooltip.hide();
};
LiveValidator.themes.Bootstrap3Tooltip.prototype.addErrors = function( errors ) {

    // Create title for tooltip
    var title = errors.join( '<br>' );

    // Set title and show tooltip
    this.element.dataset.originalTitle = title;
    this.tooltip.tip().find( '.tooltip-inner' ).html( title );
    LiveValidator.utils.addClass( this.parentEl, this.options.error );

    // Only show tooltip if element has focus and tooltip not shown
    if ( this.parentEl && this.element === document.activeElement && !this.parentEl.querySelector( '.tooltip' ) ) {
        this.tooltip.show();
    }
};
