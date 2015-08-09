(function () {
    'use strict';

    angular.module('blocks.router')
        .provider('routeHelperConfig', routeHelperConfig)

    // Must configure via the routehelperConfigProvider
    function routeHelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
             $routeProvider: undefined,
             docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

})();