(function () {
    'use strict';

    function authInterceptorFactory(authTokenFactory) {

        function request(config) {
            var token = authTokenFactory.getToken();
            if (token) {
                console.log("placing token on the header");
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }

        function response(res) {
            return res;
        }

        return {
            request: request,
            response: response
        }
    }


    var app = angular.module('jwtApp');
    app.factory('authInterceptorFactory', ['authTokenFactory', authInterceptorFactory]);
})();
