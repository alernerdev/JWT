(function () {
    'use strict';

    function alertSvc($rootScope, $timeout) {

        var alertTimeout;

        return function (type, title, message, timeout) {

            $rootScope.alertObj = {
                hasBeenShown: true,
                show: true,
                type: type,
                message: message,
                title: title
            };

            $timeout.cancel(alertTimeout);
            alertTimeout = $timeout(function () {
                $rootScope.alertObj.show = false;
            }, timeout || 2000);
        }
    }

    var app = angular.module('jwtApp');
    app.service('alertSvc', ['$rootScope', '$timeout', alertSvc]);
})();
