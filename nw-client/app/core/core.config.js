(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configure);

    function configure($routeProvider,$resourceProvider, routeHelperConfigProvider, authProvider, $httpProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        //$httpProvider.defaults.cache = true;
        //$cookiesProvider.
        // Configure auth provider
        authProvider.setLoginUrl("http://localhost:8083/auth");
        authProvider.setLogoutUrl("http://localhost:8083/logout");
        authProvider.setAfterLogoutUrl("/");

        // Configure the common route provider
        routeHelperConfigProvider.config.$routeProvider = $routeProvider;
        routeHelperConfigProvider.config.docTitle = 'SerpTracker - ';
    }
})();