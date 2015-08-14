(function() {
    'use strict';

    angular.module('app.core', [
        'ngRoute',
        'ngAnimate',
        'ngResource',
        'app.layout',
        'blocks.filter',
        'blocks.router', 'blocks.auth'
    ]);

})();