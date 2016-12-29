(function () {
    'use strict';

    function authInterceptorFactory(authTokenFactory) {

        function request(config) {
            var token = authTokenFactory.getToken();
            if (token) {
                // 'authorization' header here must match 'authorization' on the backend side
                config.headers.authorization = 'Bearer ' + token;
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
