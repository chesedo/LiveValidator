var helper = helper || {};
helper.themes = helper.themes || {};
helper.themes.uikit = helper.themes.uikit || {};

helper.themes.uikit.getRow = function() {
    setFixtures( '<div class="uk-form-row"><label class="uk-form-label">Label</label>' +
    '<div class="uk-form-controls"><input /></div></div>' );

    return document.getElementsByClassName( 'uk-form-row' )[ 0 ];
};
