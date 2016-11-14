var helper = helper || {};

helper.bareInput = function() {
    setFixtures( '<input />' );
    return document.getElementsByTagName( 'input' )[ 0 ];
};

helper.bareJqInput = function() {
    return $( helper.bareInput() );
};

helper.requiredInput = function() {
    setFixtures( '<input required />' );
    return document.getElementsByTagName( 'input' )[ 0 ];
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

helper.inputEvent = new Event( 'input' );
helper.blurEvent = new Event( 'blur' );
