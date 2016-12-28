(function () {
    'use strict';

    var app = angular.module('jwtApp')
    app.config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '/views/main.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register.html',
                controller: 'registerController'
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: '/views/jobs.html',
                controller: 'jobsController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'logoutController'
            });

        $httpProvider.interceptors.push('authInterceptorFactory');
    });

    app.constant('API_URL', 'http://localhost:4000');

} ());
