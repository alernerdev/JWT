(function () {
    'use strict';

    function jobsController($scope, $http, API_URL, alertSvc) {

        $http.get(API_URL + '/jobs')
            .then(function(res) {
                $scope.jobs = res;
            },
            function(err) {
                // response from backend is an object containing a message field
                alertSvc('warning', 'Unable to get jobs', err.data.message);
            });
    }

    var app = angular.module('jwtApp');
    app.controller('jobsController', ['$scope', '$http', 'API_URL', 'alertSvc', jobsController]);
})();
