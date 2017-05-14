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
        $scope.publications={};
        $scope.followers={};
        $scope.devices={};
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

            $http.get(urlapi + "publications/user/id/" + user._id)
                .then(function(data) {
                    console.log('data success events');
                    console.log(data); // for browser console
                    $scope.publications = data.data;
                    var chartPublications = utils.publicationsToChart($scope.publications);
                    $scope.dataChartPublications = chartPublications[0];
                    $scope.labelsChartPublications = chartPublications[1];
                }, function(data) {
                    console.log('data error');


                });
            $http.get(urlapi + "users/whoisfollowingtheuser/" + user._id)
                .then(function(data) {
                    console.log('data success events');
                    console.log(data); // for browser console
                    $scope.followers = data.data;
                    var chartFollowers = utils.followersToChart($scope.followers);
                    $scope.dataChartFollowers = chartFollowers[0];
                    $scope.labelsChartFollowers = chartFollowers[1];
                }, function(data) {
                    console.log('data error');


                });

            $http.get(urlapi + "/users/id/" + user._id + "/devices")
                .then(function(data) {
                    console.log('data success events');
                    console.log(data); // for browser console
                    $scope.devices = data.data;
                }, function(data) {
                    console.log('data error');
                });
        };

        //network map
        var nodes = [];
        var edges = [];
        $scope.chartPublicationsData = {
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
        $scope.dataChart = [65, 59, 80, 81, 56, 55, 40];
    });
