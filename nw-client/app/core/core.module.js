(function() {
    'use strict';

    angular.module('app.core', [
        'ngRoute',
        'ngAnimate',
        'toastr',
        'ngResource',
        'app.layout',
        'blocks.filter',
        'blocks.directive',
        'blocks.router',
        'blocks.auth'
    ]);

})();