(function () {
    'use strict';

    function logoutController(authTokenFactory, $state) {
        authTokenFactory.removeToken();

        // redirect to the main page after a logout
        $state.go('main');
    }

    var app = angular.module('jwtApp');
    app.controller('logoutController', ['authTokenFactory', '$state', logoutController]);
})();
