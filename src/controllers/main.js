(function() {
  'use strict';

  function mainController($scope) {
    console.log("hello from main controller");
  }

  var app = angular.module('jwtApp');
  app.controller('mainController', ['$scope', mainController]);
}());
