var helper = helper || {};
helper.autoChecks = helper.autoChecks || {};

helper.autoChecks.createInput = function( type ) {
    setFixtures( '<input type="' + type + '" min="1" max="10" minlength="1" maxlength="2" pattern="a-z" ' +
        ' title="Helper title" />' );
    return $( 'input' )[ 0 ];
};
