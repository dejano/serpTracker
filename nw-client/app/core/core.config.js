(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configure);

    function configure($routeProvider,$resourceProvider, routeHelperConfigProvider, authProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
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