var helper = helper || {};
helper.themes = helper.themes || {};
helper.themes.default = helper.themes.default || {};

helper.themes.default.getRow = function() {
    setFixtures( '<div class="row"><label for="input">Label</label><input /></div>' );

    return document.getElementsByClassName( 'row' )[ 0 ];
};

helper.themes.getInput = function( row ) {
    return row.getElementsByTagName( 'input' )[ 0 ];
};
