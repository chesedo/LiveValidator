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

    // Null values should not overwrite previous values for defaults to work correctly
    it( 'when value is null', function() {
        var first = { 1: { '1.1': true, '1.2': true } };
        var second = { 1: { '1.2': null } };
        LiveValidator.utils.extend( first, second );
        expect( first ).toEqual( { 1: { '1.1': true, '1.2': true } } );
    } );

    it( 'that first object is changed', function() {
        var first = { 1: { '1.1': true, '1.2': true } };
        var second = { 1: { '1.2': false } };
        LiveValidator.utils.extend( first, second );
        expect( first ).toEqual( { 1: { '1.1': true, '1.2': false } } );
    } );

    it( 'that arrays are handled as arrays', function() {
        var initial = { array: [] };
        var second = { array: [ 'string' ] };
        var extend = LiveValidator.utils.extend( {}, initial, second );
        expect( extend.array ).toEqual( [ 'string' ] );
    } );

    it( 'that arrays are not linked', function() {
        var initial = {};
        var added = { array: [ 'string' ] };
        LiveValidator.utils.extend( initial, added );

        // Their reference should not equal
        expect( initial.array ).not.toBe( added.array );
    } );
};
