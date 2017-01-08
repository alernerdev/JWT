(function () {
    'use strict';

    function loginController($scope, alertSvc, authSvc) {

        $scope.submit = function () {
            authSvc.login($scope.email, $scope.password)
                .then(function (res) {
                    alertSvc("success", "Welcome", "Thanks for coming back " + res.user.email + "!");
                }, function (err) {
                    alertSvc("warning", "Something went wrong :(", err ? err.message : "");
                });
        }
    }

    var app = angular.module('jwtApp');
    app.controller('loginController', ['$scope', 'alertSvc', 'authSvc', loginController]);
})();
