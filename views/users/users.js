'use strict';

angular.module('app.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'views/users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', function($scope, VisDataSet, $http, utils) {
        $scope.users;
        $http.get(urlapi + "users/devices")
            .then(function(data) {
                console.log('data success events');
                console.log(data); // for browser console
                $scope.users = data.data;
                $scope.showUsersNetwork();

            }, function(data) {
                console.log('data error');


            });
        $scope.showUsersNetwork = function() {
            var network = utils.usersToNetwork($scope.users);
            console.log(network);
            nodes = VisDataSet(network[0]);
            edges = VisDataSet(network[1]);
            $scope.data = {
                nodes: nodes,
                edges: edges
            };
        };

        $scope.user;
        $scope.selectUser = function(user) {
            console.log("user " + user.username);
            $http.get(urlapi + "users/id/" + user._id)
                .then(function(data) {
                    console.log('data success events');
                    console.log(data); // for browser console
                    $scope.user = data.data;
                    var network = utils.devicesToNetwork($scope.user, $scope.user.devices);
                    nodes = VisDataSet(network[0]);
                    edges = VisDataSet(network[1]);
                    $scope.data = {
                        nodes: nodes,
                        edges: edges
                    };
                }, function(data) {
                    console.log('data error');


                });
        };

        //network map
        var nodes = [];
        var edges = [];
        $scope.data = {
            nodes: nodes,
            edges: edges
        };
        $scope.options = {
            autoResize: true,
            height: '100%',
            width: '100%'
        };


        //chart
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.dataChart = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
    });
