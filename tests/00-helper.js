var helper = helper || {};

helper.bareInput = function() {
    setFixtures( '<input />' );
    return $( 'input' );
};

helper.requiredInput = function() {
    setFixtures( '<input required />' );
    return $( 'input' );
};

helper.createSpyTheme = function() {
    var spyTheme = function spyTheme() {};

    spyTheme.prototype.markRequired = function() {};
    spyTheme.prototype.unmarkRequired = function() {};
    spyTheme.prototype.setMissing = function() {};
    spyTheme.prototype.unsetMissing = function() {};
    spyTheme.prototype.addErrors = function() {};
    spyTheme.prototype.clearErrors = function() {};

    return spyTheme;
};
