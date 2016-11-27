/* globals UIkit */

// Get namespace ready
var LiveValidator = LiveValidator || {};
LiveValidator.themes = LiveValidator.themes || {};

LiveValidator.themes.UIkitTooltip = function UIkitTooltipTheme( element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.themes.UIkitTooltip ) ) {
        return new LiveValidator.themes.UIkitTooltip( element, options );
    }

    // Call parent (UIkit) constructor
    LiveValidator.themes.UIkit.call(
        this,
        element,
        LiveValidator.utils.extend(
            {},
            { tooltip: {
                pos: 'bottom-left',
                animation: true
            } },
            options
        )
    );

    this.tooltip = UIkit.tooltip( UIkit.$( this.element ), this.options.tooltip );
};

// Inherit methods from UIkit
LiveValidator.themes.UIkitTooltip.prototype = Object.create( LiveValidator.themes.UIkit.prototype );
LiveValidator.themes.UIkitTooltip.prototype.constructor = LiveValidator.themes.UIkitTooltip;

LiveValidator.themes.UIkitTooltip.prototype.clearErrors = function() {

    // Change visuals and internals as is needed
    this.unsetMissing();
    this.element.dataset.cachedTitle = '';

    // Get tooltip to manipulate it
    var $tooltip = $( '.uk-tooltip' );

    // The same hide() code from the tooltip.js file with extras removed.
    if ( this.tooltip.options.animation ) {
        $tooltip.fadeOut( parseInt( this.tooltip.options.animation, 10 ) || 400, function() {
            $tooltip.removeClass( this.tooltip.options.activeClass );
        }.bind( this ) );
    } else {
        $tooltip.hide().removeClass( this.tooltip.options.activeClass );
    }
};
LiveValidator.themes.UIkitTooltip.prototype.addErrors = function( errors ) {
    errors = errors.join( '<br>' );

    // Get tooltip to manipulate it
    var $tooltip = $( '.uk-tooltip' );

    // Set errors and change internals
    this.element.dataset.cachedTitle = errors;
    $tooltip.find( '.uk-tooltip-inner' ).html( errors );
    this.setMissing();

    if ( !$tooltip.hasClass( this.tooltip.options.activeClass ) && this.element === document.activeElement ) {
        this.tooltip.show();
    }
};
