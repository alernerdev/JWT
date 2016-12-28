(function() {
    'use strict';

    function registerController($scope, $http, alertSvc, authTokenFactory, API_URL) {

        $scope.submit = function() {
            var user = {
                email: $scope.email,
                password: $scope.password
            }

            console.log("click on submit inside register controller");
            $http.post(API_URL + '/register', user).
                then(function(res) {

                  alertSvc("success", "Account created!", "Welcome, " + res.data.user.email + "!");
                  // token came back from the backend
                  authTokenFactory.setToken(res.token);
            }, function(err) {
                 alertSvc("warning", "Oops!", "Could not register");
            });
        }
    }

    var app = angular.module('jwtApp');
    app.controller('registerController', ['$scope', '$http', 'alertSvc', 'authTokenFactory', 'API_URL', registerController]);
})();
