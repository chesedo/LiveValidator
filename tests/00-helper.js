var helper = {};

helper.bareInput = function() {
    setFixtures( '<input />' );
    return $( 'input' );
};

helper.requiredInput = function() {
    setFixtures( '<input required />' );
    return $( 'input' );
};
