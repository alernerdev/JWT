(function() {

    'use strict';

    /*
        this directive sits on the confirm_password field, and attrs.validateEquals in HTML contains the name
        of the "password" field to compare against

        this is a very simple directive.  this validation kicks in only when typing in the
        "confirm" password.  So in the scenario where confirm password is filled out first and regular password
        second, this doesnt work
    */
    function validateEquals() {
        return {
            require: 'ngModel',

            // NgModelController provides API for the ngModel directive
            link: function(scope, element, attrs, ngModelCtrl) {
                function f(value) {

                    var compareAgainst =  scope.$eval(attrs.validateEquals);
                    console.log("comparing " + value + " and " + compareAgainst);

                    var valid = (value === compareAgainst);
                    ngModelCtrl.$setValidity('equal', valid);
                    return valid ? value : undefined;
                }

                ngModelCtrl.$parsers.push(f);
                ngModelCtrl.$formatters.push(f);

                /* this callback setup needed to "trigger" formatter
                It is invoked only when the text in "password" field changes

                not sure if this code actually accomplishes anything.
                it watches the password field for changes
                */
                scope.$watch(attrs.validateEquals, function() {
                    console.log("in callback, $viewValue is " + ngModelCtrl.$viewValue);
                    ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                });
            }
        }
    }

    var app = angular.module('jwtApp');
    app.directive('validateEquals', [validateEquals]);
}());
