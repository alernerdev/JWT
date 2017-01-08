(function () {
    'use strict';

    function registerController($scope, alertSvc, authSvc) {

        $scope.submit = function () {
            authSvc.register($scope.email, $scope.password)
                .then(function (res) {
                    alertSvc("success", "Account created!", "Welcome, " + res.user.email + "!");
                }, function (err) {
                    alertSvc("warning", "Could not register", err ? err.message : "");
                });
        }
    }

    var app = angular.module('jwtApp');
    app.controller('registerController', ['$scope', '$http', 'alertSvc', 'authSvc', registerController]);
})();
