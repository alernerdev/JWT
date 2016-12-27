(function () {
    'use strict';

    function authTokenFactory($window) {
        var storage = $window.localStorage;

        var cachedToken;    // optimization to keep it in memory

        function setToken(token) {
            cachedToken = token;
            storage.setItem('userToken', token);
        };

        function getToken() {
            if (!cachedToken)
                cachedToken = storage.getItem('userToken');

            return cachedToken;
        };

        function isAuthenticated() {
            return !!this.getToken();
        }

        return {
            setToken: setToken,
            getToken: getToken,
            isAuthenticated : isAuthenticated
        };
    }


    var app = angular.module('jwtApp');
    app.factory('authTokenFactory', ['$window', authTokenFactory]);
})();
