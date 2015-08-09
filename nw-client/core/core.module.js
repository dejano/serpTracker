(function() {
    'use strict';

    angular.module('app.core', [
        'ngRoute',
        'ngAnimate',
        'app.layout',
        'blocks.filter',
        'blocks.router', 'blocks.auth'
    ]);

})();