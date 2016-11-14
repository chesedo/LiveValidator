var theme = theme || {};
theme.default = theme.default || {};

theme.default.unsetMissingSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.default.getRow();
        this.theme = new LiveValidator.themes.Default( helper.themes.getInput( this.row ) );
    } );

    it( 'already missing', function() {
        LiveValidator.utils.addClass( this.row, 'missing' );
        expect( this.row ).toHaveClass( 'missing' );
        this.theme.unsetMissing();
        expect( this.row ).not.toHaveClass( 'missing' );
    } );

    it( 'not missing', function() {
        expect( this.row ).not.toHaveClass( 'missing' );
        this.theme.unsetMissing();
        expect( this.row ).not.toHaveClass( 'missing' );
    } );
};
