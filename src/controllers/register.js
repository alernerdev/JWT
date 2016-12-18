(function () {
    'use strict';

    function registerController($scope, alert) {
        console.log("hello from register controller");
        $scope.submit = function () {
            var url = "/";
            var user = {}

            console.log("click on submit");

            fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin"
            }).then(function (response) {
                /*
                response.status //=> number 100–599
                response.statusText //=> String
                response.headers //=> Headers
                response.url //=> String

                return response.text()
                */
                console.log(response.status + " " + response.statusText);
                alert("success", "OK!", "You are now registered");

            }, function (error) {
                console.log(error.message);
                alert("warning", "Oops!", "Could not register");
            });
        }
    }

    var app = angular.module('jwtApp');
    app.controller('registerController', ['$scope', 'alert', registerController]);
})();
