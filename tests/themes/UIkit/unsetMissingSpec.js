var theme = theme || {};
theme.uikit = theme.uikit || {};

theme.uikit.unsetMissingSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.uikit.getRow();
        this.input = this.row.querySelector( 'input' );
        this.theme = new LiveValidator.themes.UIkit( this.input );
    } );

    it( 'already missing', function() {
        this.input.classList.add( 'uk-form-danger' );
        expect( this.input ).toHaveClass( 'uk-form-danger' );
        this.theme.unsetMissing();
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
        expect( this.input ).toHaveClass( 'uk-form-success' );
    } );

    it( 'not missing', function() {
        this.input.classList.add( 'uk-form-success' );
        expect( this.input ).toHaveClass( 'uk-form-success' );
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
        this.theme.unsetMissing();
        expect( this.input ).not.toHaveClass( 'uk-form-danger' );
        expect( this.input ).toHaveClass( 'uk-form-success' );
    } );
};
