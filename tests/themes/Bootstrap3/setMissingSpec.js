var theme = theme || {};
theme.bootstrap3 = theme.bootstrap3 || {};

theme.bootstrap3.setMissingSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
        this.theme = new LiveValidator.themes.Bootstrap3( this.row.querySelector( 'input' ) );
    } );

    it( 'already missing', function() {
        this.row.classList.add( 'has-error' );
        expect( this.row ).toHaveClass( 'has-error' );
        this.theme.setMissing();
        expect( this.row ).toHaveClass( 'has-error' );
    } );

    it( 'not missing', function() {
        expect( this.row ).not.toHaveClass( 'has-error' );
        this.theme.setMissing();
        expect( this.row ).toHaveClass( 'has-error' );
    } );
};
