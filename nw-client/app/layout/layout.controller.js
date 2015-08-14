(function () {
    'use strict';

    angular.module('app.layout').controller('layoutController', layoutController);

    function layoutController($scope, $cookies, $timeout, $log) {
        //$scope.isLoggedIn = $cookieStore.get('isLoggedIn');
        $scope.$watch(function() { return $cookies.user; }, function(newValue) {
            $log.log('Cookie string: ' + $cookies.user)
            $scope.user = $cookies.user;
        });

        //$timeout(function () {
        //    $cookies.isLoggedIn = 'second value';
        //}, 1000);
    }
})();