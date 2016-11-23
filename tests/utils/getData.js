var utils = utils || {};

utils.getData = function() {
    it( 'when data is not set', function() {
        setFixtures( '<div id="data"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( {} );
    } );

    it( 'when data is a string', function() {
        setFixtures( '<div id="data" data-string="string"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { string: 'string' } );
    } );

    it( 'when data is an integer', function() {
        setFixtures( '<div id="data" data-int="4"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { int: 4 } );
    } );

    it( 'when data is a float', function() {
        setFixtures( '<div id="data" data-float="4.4"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { float: 4.4 } );
    } );

    it( 'when data is a boolean', function() {
        setFixtures( '<div id="data" data-bool="true"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { bool: true } );
    } );

    it( 'when data is an array', function() {
        setFixtures( '<div id="data" data-array=\'["string",4,4.4,true]\'></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { array: [ 'string', 4, 4.4, true ] } );
    } );

    it( 'when data is an object', function() {
        setFixtures( '<div id="data" data-object=\'{"string": "string", "int": 4}\'></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { object: { string: 'string', int: 4 } } );
    } );

    it( 'when multiple data is set', function() {
        setFixtures( '<div id="data" data-float="4.4" data-bool="false"></div>' );
        var div = document.getElementById( 'data' );

        expect( LiveValidator.utils.getData( div ) ).toEqual( { float: 4.4, bool:false } );
    } );
};
