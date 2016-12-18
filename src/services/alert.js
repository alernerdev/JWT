(function () {
    'use strict';

    function alert($rootScope, $timeout) {
        return function (type, title, message, timeout) {
            $rootScope.alert = {
                hasBeenShown: true,
                show: true,
                type: type,
                message: message,
                title: title
            };

            var alertTimeout = $timeout(function () {
                $rootScope.alert.show = false;
            }, timeout || 2000);

            $timeout.cancel(alertTimeout);
        }

    }

    var app = angular.module('jwtApp');
    app.service('alert', ['$rootScope', '$timeout', alert]);
})();
