(function() {

    'use strict';

    function validateEquals() {
        return {
            require: 'ngModel',

            // NgModelController provides API for the ngModel directive
            link: function(scope, element, attrs, ngModelCtrl) {
                function validateEqual(value) {

                    console.log("validateEqual is called");

                    var valid = (value === scope.$eval(attrs.validateEquals));
                    ngModelCtrl.$setValidity('equal', valid);
                    return valid ? value : undefined;
                }

                ngModelCtrl.$parsers.push(validateEqual);
                ngModelCtrl.$formatters.push(validateEqual);

                scope.$watch(attrs.validateEquals, function() {
                    ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                });
            }
        }
    }

    var app = angular.module('jwtApp');
    app.directive('validateEquals', [validateEquals]);
}());
