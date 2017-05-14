'use strict';

angular.module('app.consum', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/consum', {
            templateUrl: 'views/consum/consum.html',
            controller: 'ConsumCtrl'
        });
    }])

    .controller('ConsumCtrl', function($scope) {

    });
