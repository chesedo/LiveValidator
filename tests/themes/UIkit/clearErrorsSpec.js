var theme = theme || {};
theme.uikit = theme.uikit || {};

theme.uikit.clearErrorsSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.uikit.getRow();
        this.input = this.row.querySelector( 'input' );
        this.controls = this.row.querySelector( '.uk-form-controls' );
        this.theme = new LiveValidator.themes.UIkit( this.input );
    } );

    it( 'already has errors', function() {
        this.input.classList.add( 'uk-form-danger' );
        var li = document.createElement( 'li' );
        li.innerHTML = 'Old Error';

        var ul = document.createElement( 'ul' );
        ul.classList.add( 'uk-list' );
        ul.classList.add( 'uk-text-danger' );
        ul.classList.add( 'uk-margin-small-top' );
        ul.classList.add( 'uk-margin-small-left' );
        ul.appendChild( li );

        this.controls.appendChild( ul );
        expect( this.row ).toContainHtml( '<ul class="uk-list uk-text-danger uk-margin-small-top ' +
        'uk-margin-small-left"><li>Old Error</li></ul>' );

        this.theme.clearErrors();
        expect( this.row ).not.toContainText( 'Error' );
        expect( this.row ).not.toContainElement( 'ul.uk-list' );
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
    } );

    it( 'having no errors', function() {
        expect( this.row ).not.toContainElement( 'ul.uk-list' );
        this.theme.clearErrors();
        expect( this.row ).not.toContainElement( 'ul.uk-list' );
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
    } );
};
