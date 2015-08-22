(function (angular, undefined) {
    'use strict';

    angular.module("blocks.auth").controller("authController", authController);

    authController.$inject = ['$scope', 'auth', '$cookieStore', '$location', '$http'];
    function authController($scope, auth, $cookieStore, $location) {
        var path = $location.path();
        if (path.indexOf('/login') != -1 && $cookieStore.get('user')) {
            $location.path('/');
        }

        $scope.auth = function () {
            auth.login($scope.username, $scope.password);
        };

        if ($location.path().indexOf('/logout') != -1 && !$cookieStore.get('user')) {
            $location.path('/login');
        }

        if ($location.path().indexOf('/logout') != -1 && $cookieStore.get('user')) {
            auth.logout();
        }
        $scope.logout = function () {

        }
    }
}(angular));