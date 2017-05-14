'use strict';

angular.module('app.requirments', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/requirments', {
            templateUrl: 'views/requirments/requirments.html',
            controller: 'RequirmentsCtrl'
        });
    }])

    .controller('RequirmentsCtrl', function($scope) {

    });
