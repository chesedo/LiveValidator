var theme = theme || {};
theme.bootstrap3 = theme.bootstrap3 || {};

theme.bootstrap3.markRequiredSpec = function() {
    beforeEach( function() {
        this.row = helper.themes.bootstrap3.getRow();
    } );

    it( 'already required', function() {
        var asterisk = document.createElement( 'span' );
        asterisk.innerHTML = ' *';
        asterisk.classList.add( 'text-danger' );

        var label = this.row.querySelector( 'label' );
        label.appendChild( asterisk );

        var theme = new LiveValidator.themes.Bootstrap3( this.row.querySelector( 'input' ) );

        expect( label.innerHTML ).toBe( 'Label<span class="text-danger"> *</span>' );
        theme.markRequired();
        expect( label.innerHTML ).toBe( 'Label<span class="text-danger"> *</span>' );
    } );

    it( 'not required', function() {
        var theme = new LiveValidator.themes.Bootstrap3( this.row.querySelector( 'input' ) );
        var label = this.row.querySelector( 'label' );

        expect( label.innerHTML ).toBe( 'Label' );
        theme.markRequired();
        expect( label.innerHTML ).toBe( 'Label<span class="text-danger"> *</span>' );
    } );

    it( 'parent element not found', function() {
        var theme = new LiveValidator.themes.Bootstrap3(
            this.row.querySelector( 'input' ),
            { parentSelector: 'wrong' }
        );

        expect( theme.markRequired.bind( theme ) ).not.toThrow();
    } );
};
