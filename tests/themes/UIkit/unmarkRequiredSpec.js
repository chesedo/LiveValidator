var theme = theme || {};
theme.uikit = theme.uikit || {};

theme.uikit.unmarkRequiredSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.uikit.getRow();
    } );

    it( 'already required', function() {
        var asterisk = document.createElement( 'span' );
        asterisk.innerHTML = ' *';
        asterisk.classList.add( 'uk-text-danger' );

        var label = this.row.querySelector( 'label' );
        label.appendChild( asterisk );

        var theme = new LiveValidator.themes.UIkit( this.row.querySelector( 'input' ) );

        expect( label.innerHTML ).toBe( 'Label<span class="uk-text-danger"> *</span>' );
        theme.unmarkRequired();
        expect( label.innerHTML ).toBe( 'Label' );
    } );

    it( 'not required', function() {
        var theme = new LiveValidator.themes.UIkit( this.row.querySelector( 'input' ) );
        var label = this.row.querySelector( 'label' );

        expect( label.innerHTML ).toBe( 'Label' );
        theme.unmarkRequired();
        expect( label.innerHTML ).toBe( 'Label' );
    } );
};
