(function () {
    'use strict';

    function loginController($scope, $http, API_URL, authTokenFactory, alertSvc) {

        $scope.submit = function () {

            console.log('called submit on login controller');

            var user = {
                email: $scope.email,
                password: $scope.password
            }

            $http.post(API_URL + '/login', user).
                then(function (res) {
                    alertSvc("success", "Welcome", "Thanks for coming back " + res.data.user.email + "!");
                    // token came back from the backend
                    authTokenFactory.setToken(res.data.token);
                }, function (err) {
                      alertSvc("warning", "Something went wrong :(",  err ? err.data.message : "");
                });
        }

    }

    var app = angular.module('jwtApp');
    app.controller('loginController', ['$scope', '$http', 'API_URL', 'authTokenFactory', 'alertSvc', loginController]);
})();
