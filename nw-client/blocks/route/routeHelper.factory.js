(function () {
    'use strict';

    angular.module('blocks.router').factory('routeHelper', routeHelper);

    routeHelper.$inject = ['$location', '$rootScope', '$route', 'routeHelperConfig'];

    function routeHelper($location, $rootScope, $route, routeHelperConfig) {
        var routes = [];

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes
        };
        var $routeProvider = routeHelperConfig.config.$routeProvider;

        init();
        return service;
        //////////////

        function init() {
            handleErrors();
            updateTitle();
        }

        function configureRoutes(routes) {
            routes.forEach(function (route) {
                //route.config.resolve =
                //    angular.extend(route.config.resolve || {}, true);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function handleErrors() {

        }

        function updateTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    $rootScope.title = routeHelperConfig.config.docTitle + ' ' + (current.title || ''); // data bind to <title>
                    //$rootScope.loggedIn = true;
                }
            );
        }
    }
})();