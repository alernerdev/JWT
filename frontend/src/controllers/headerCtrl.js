(function () {
    'use strict';

    function headerController($scope, authTokenFactory) {
        $scope.isAuthenticated = authTokenFactory.isAuthenticated;
    }

    var app = angular.module('jwtApp');
    app.controller('headerController', ['$scope', 'authTokenFactory', headerController]);
})();
