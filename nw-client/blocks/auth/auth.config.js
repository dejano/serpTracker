(function () {
    'use strict';

    var core = angular.module('blocks.auth');

    core.config(configure);

    function configure($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
})();