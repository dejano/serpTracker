(function () {
    'use strict';

    angular.module('blocks.auth').run(appRun);

    appRun.$inject = ['routeHelper', '$location']

    function appRun(routeHelper, $location) {
        routeHelper.configureRoutes(getRoutes());

    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'blocks/auth/layout/login.html',
                    controller: 'authController',
                    title: 'Login'
                }
            },
            {
                url: '/logout',
                config: {
                    templateUrl: 'blocks/auth/layout/login.html',
                    controller: 'authController',
                    title: 'Logout'
                }
            }
        ];
    }
})();
