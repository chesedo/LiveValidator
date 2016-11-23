var utils = utils || {};

utils.extend = function() {
    it( 'when objects are shallow', function() {
        expect( LiveValidator.utils.extend( { 1: true }, { 2: false } ) ).toEqual( { 1: true, 2: false } );
    } );

    it( 'when objects have duplicates', function() {
        expect( LiveValidator.utils.extend( { 1: true, 2: true }, { 2: false } ) ).toEqual( { 1: true, 2: false } );
    } );

    it( 'when objects are deep', function() {
        var extend = LiveValidator.utils.extend( { 1: { '1.1': true } }, { 2: false } );
        expect( extend ).toEqual( { 1: { '1.1': true }, 2: false } );
    } );

    it( 'when objects are deep and have duplicates', function() {
        var extend = LiveValidator.utils.extend( { 1: { '1.1': true, '1.2': true } }, { 1: { '1.2': false } } );
        expect( extend ).toEqual( { 1: { '1.1': true, '1.2': false } } );
    } );

    it( 'that first object is changed', function() {
        var first = { 1: { '1.1': true, '1.2': true } };
        var second = { 1: { '1.2': false } };
        LiveValidator.utils.extend( first, second );
        expect( first ).toEqual( { 1: { '1.1': true, '1.2': false } } );
    } );
};
