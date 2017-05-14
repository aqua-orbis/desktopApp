'use strict';

angular.module('app.contracts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contracts', {
            templateUrl: 'views/contracts/contracts.html',
            controller: 'ContractsCtrl'
        });
    }])

    .controller('ContractsCtrl', function($scope) {

    });
