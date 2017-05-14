'use strict';

angular.module('app.contacts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'views/contacts/contacts.html',
            controller: 'ContactsCtrl'
        });
    }])

    .controller('ContactsCtrl', function($scope) {

    });
