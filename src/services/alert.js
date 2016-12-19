(function () {
    'use strict';

    function alert($rootScope, $timeout) {

        var alertTimeout;

        return function (type, title, message, timeout) {

            console.log("got inside the alert service");

            $rootScope.alert = {
                hasBeenShown: true,
                show: true,
                type: type,
                message: message,
                title: title
            };

            $timeout.cancel(alertTimeout);
            alertTimeout = $timeout(function () {
                console.log("got inside the alrt timeout");
                $rootScope.alert.show = false;
            }, timeout || 2000);
        }
    }

    var app = angular.module('jwtApp');
    app.service('alert', ['$rootScope', '$timeout', alert]);
})();
