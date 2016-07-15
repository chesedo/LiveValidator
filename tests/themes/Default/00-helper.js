var helper = helper || {};
helper.themes = helper.themes || {};
helper.themes.default = helper.themes.default || {};

helper.themes.default.getRow = function() {
    setFixtures( '<div class="row"><label for="input">Label</label><input /></div>' );

    return $( '.row' );
};
