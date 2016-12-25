(function () {
    'use strict';

    function registerController($scope, $http, alertSvc) {

        $scope.submit = function () {
            var url = "/";
            var user = {}

            console.log("click on submit inside register controller");
            $http.post(url, user)

            .success(function(res) {
                alertSvc("success", "OK!", "You are now registered");
            })
            .error(function(err) {
               alertSvc("warning", "Oops!", "Could not register");
            });
        }
    }

    var app = angular.module('jwtApp');
    app.controller('registerController', ['$scope', '$http', 'alertSvc', registerController]);
})();
