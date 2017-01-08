(function () {
    'use strict';

    function authTokenFactory($window) {
        var storage = $window.localStorage;

        var cachedToken;    // optimization to keep it in memory
        var userTokenStr = 'userToken';

        function setToken(token) {
            cachedToken = token;
            storage.setItem(userTokenStr, token);

            console.log("from authTokenFactory, setting token " + cachedToken);
        };

        function getToken() {
            if (!cachedToken)
                cachedToken = storage.getItem(userTokenStr);

            return cachedToken;
        };

        function isAuthenticated() {
            // the reason its done through authTokenObj instead of using "this" is because
            // this function is executed from inside HTML code and its not referring to the right "this" pointer when the flow gets here.
            return !!authTokenObj.getToken();
        }

        function removeToken() {
            cachedToken = null;
            storage.removeItem(userTokenStr);
        }

        var authTokenObj = {
            setToken: setToken,
            getToken: getToken,
            isAuthenticated : isAuthenticated,
            removeToken: removeToken
        };

        return authTokenObj;
    }


    var app = angular.module('jwtApp');
    app.factory('authTokenFactory', ['$window', authTokenFactory]);
})();
