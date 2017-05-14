'use strict';

angular.module('app.waterpipes', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/waterpipes', {
            templateUrl: 'views/waterpipes/waterpipes.html',
            controller: 'WaterpipesCtrl'
        });
    }])

    .controller('WaterpipesCtrl', function($scope) {
        
    });
