// Get namespace ready
var LiveValidator = LiveValidator || {};
LiveValidator.themes = LiveValidator.themes || {};

LiveValidator.themes.UIkit = function UIkitTheme( element, options ) {

    // Scope-safe the object
    if ( !( this instanceof LiveValidator.themes.UIkit ) ) {
        return new LiveValidator.themes.UIkit( element, options );
    }

    this.element = element;
    this.options = LiveValidator.utils.extend(
        {},
        {
            danger: 'uk-form-danger',
            success: 'uk-form-success',
            parentSelector: '.uk-form-row',
            controlsSelector: '.uk-form-controls'
        },
        options
    );
    this.asterisk = null;
    this.controls = null;
    this.parentEl = LiveValidator.utils.parentSelector( this.element, this.options.parentSelector );

    if ( this.parentEl ) {
        this.asterisk = this.parentEl.querySelector( 'span.uk-text-danger' );
        this.controls = this.parentEl.querySelector( this.options.controlsSelector );
    }
};

LiveValidator.themes.UIkit.prototype.markRequired = function() {
    if ( !this.asterisk && this.parentEl ) {
        this.asterisk = document.createElement( 'span' );
        this.asterisk.innerHTML = ' *';
        LiveValidator.utils.addClass( this.asterisk, 'uk-text-danger' );
        LiveValidator.utils.appendChild( this.parentEl.querySelector( 'label' ), this.asterisk );
    }
};
LiveValidator.themes.UIkit.prototype.unmarkRequired = function() {
    if ( this.parentEl ) {
        LiveValidator.utils.removeChild( this.parentEl.querySelector( 'label' ), 'span' );
        this.asterisk = null;
    }
};
LiveValidator.themes.UIkit.prototype.setMissing = function() {
    LiveValidator.utils.removeClass( this.element, this.options.success );
    LiveValidator.utils.addClass( this.element, this.options.danger );
};
LiveValidator.themes.UIkit.prototype.unsetMissing = function() {
    LiveValidator.utils.removeClass( this.element, this.options.danger );
    LiveValidator.utils.addClass( this.element, this.options.success );
};
LiveValidator.themes.UIkit.prototype.clearErrors = function() {
    this.unsetMissing();
    LiveValidator.utils.removeChild( this.controls, '.uk-list' );
};
LiveValidator.themes.UIkit.prototype.addErrors = function( errors ) {

    // Remove old errors
    this.clearErrors();

    // Create ul
    var ul = document.createElement( 'ul' );
    LiveValidator.utils.addClass( ul, 'uk-list' );
    LiveValidator.utils.addClass( ul, 'uk-text-danger' );
    LiveValidator.utils.addClass( ul, 'uk-margin-small-top' );
    LiveValidator.utils.addClass( ul, 'uk-margin-small-left' );

    // Add each error li
    errors.forEach( function( error ) {
        var li = document.createElement( 'li' );
        li.innerHTML = error;
        ul.appendChild( li );
    } );

    // Add ul to row
    LiveValidator.utils.appendChild( this.controls, ul );
    this.setMissing();
};
