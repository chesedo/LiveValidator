var helper = helper || {};
helper.theme = helper.theme || {};
helper.theme.default = helper.theme.default || {};

helper.theme.default.getRow = function() {
    setFixtures( '<div class="row"><label for="input">Label</label><input /></div>' );

    return $( '.row' );
};
