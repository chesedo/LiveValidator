var helper = helper || {};
helper.themes = helper.themes || {};
helper.themes.bootstrap3 = helper.themes.bootstrap3 || {};

helper.themes.bootstrap3.getRow = function() {
    setFixtures( '<div class="form-group"><label for="input">Label</label><input class="form-control" /></div>' );

    return document.getElementsByClassName( 'form-group' )[ 0 ];
};
