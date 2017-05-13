'use strict';

//var urlapi = "http://127.0.0.1:3000/api/";
var urlapi = "http://46.105.30.116:3000/api/";

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'chart.js',
  'ngVis',
  'app.menu',
  'app.dashboard',
  'app.users',
  'app.view2'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  //$routeProvider.otherwise({redirectTo: '/dashboard'});
  // if none of the above states are matched, use this as the fallback
  if ((localStorage.getItem("water_web_token")) && (JSON.parse(localStorage.getItem("water_web_userdata")) != "null") && (JSON.parse(localStorage.getItem("water_web_userdata")) != null)) {
          if ((window.location.hash == "#!/login") || (window.location.hash == "#!/signup")) {
              window.location = '#!/dashboard';
          }
          $routeProvider.otherwise({redirectTo: '/dashboard'});
      } else {
          if ((window.location != "#!/login") || (window.location != "#!/signup")) {
              console.log("removing data, and going to login");
              localStorage.removeItem("water_web_token");
              localStorage.removeItem("water_web_userdata");
              window.location = "#!/login";
              $routeProvider.otherwise({redirectTo: '/login'});
          }
      }
}])

.factory('httpInterceptor', function httpInterceptor($q, $window, $location) {
    return {
        request: function (config) {
            return config;
        },
        requestError: function (config) {
            return config;
        },
        response: function (res) {
            return res;
        },
        responseError: function (res) {
            return res;
        }
    }
})
.factory('api', function ($http) {
    return {
        init: function () {
            $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("water_web_token");
            $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("water_web_token");
        }
    };
})
.run(function (api) {
    api.init();
})

.factory('utils', function($filter) {
    return {
        deviceToChart: function(device) {
            var registers = device.registers;
            var data = [];
            var labels = [];
            for(var i=0; i<registers.length; i++) {
                data.push(registers[i].value);
                var lbl = $filter('date')(registers[i].date, 'HH')
                labels.push(lbl);
            }
            return [data, labels];
        },
        devicesToNetwork: function(user, devices) {
            var nodes = [];
            var edges = [];
            nodes.push({
                id: user._id,
                label: user.username,
                shape: "circularImage",
                image: user.img
            });
            for(var i=0; i<devices.length; i++) {
                nodes.push({
                    id: devices[i]._id,
                    label: devices[i].name,
                    shape: "diamond",
                    size: 10
                });
                edges.push({
                    from: user._id,
                    to: devices[i]._id
                });
            }
            return [nodes, edges];
        },
        usersToNetwork: function(users) {
            var nodes = [];
            var edges = [];
            for(var j=0; j<users.length; j++) {
                nodes.push({
                    id: users[j]._id,
                    label: users[j].username,
                    shape: "circularImage",
                    image: users[j].img,
                    group: users[j]._id
                });
                for(var i=0; i<users[j].devices.length; i++) {
                    nodes.push({
                        id: users[j].devices[i]._id,
                        label: users[j].devices[i].name,
                        group: users[j]._id,
                        shape: "diamond",
                        size: 10
                    });
                    edges.push({
                        from: users[j]._id,
                        to: users[j].devices[i]._id
                    });
                }
                for(var i=0; i<users[j].following.length; i++) {
                    edges.push({
                        from: users[j]._id,
                        to: users[j].following[i]._id
                    });
                }
            }
            return [nodes, edges];
        }
    };
});
