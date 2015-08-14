(function () {
    'use strict';

    angular.module('app.core').run(appRun);

    appRun.$inject = ['$rootScope', '$templateCache'];
    function appRun($rootScope, $templateCache) {
        $rootScope.setupData = {
            "name": "YoLo Company",
            "address": "1",
            "url": "http://localhost:8083/",
            "pib": "pib0",
            "accounts": [
                "222-2222222222222-22",
                "2",
                "3"
            ]
        };
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    }

})();