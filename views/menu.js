'use strict';

angular.module('app.menu', ['ngRoute'])
    .controller('MenuCtrl', function($scope, $http) {
        if (localStorage.getItem("water_web_userdata")) {
            $scope.storageuser = JSON.parse(localStorage.getItem("water_web_userdata"));
            console.log($scope.storageuser);
        } else {
            console.log("admin not logged");
        }

        $scope.loginData = {
            email: "admin@water.com",
            password: "admin",
            userAgent: "app"
        };
        $scope.doLogin = function() {
            console.log("login");
            $http({
                    url: urlapi + 'adminlogin',
                    method: "POST",
                    data: $scope.loginData
                })
                .then(function(response) {
                        // success
                        console.log("response: ");
                        console.log(response.data);
                        if (response.data.success == true) {
                            console.log("logged");
                            localStorage.setItem("water_web_token", response.data.token);
                            localStorage.setItem("water_web_userdata", JSON.stringify(response.data.user));
                            window.location.reload();
                        } else {
                            console.log("login failed");
                        }
                    },
                    function(response) { // optional
                        // failed
                        console.log(response);
                    });
        };

        $scope.logout = function() {
            localStorage.removeItem("water_web_token");
            localStorage.removeItem("water_web_userdata");
            window.location.reload(true);
        };
    });
