(function () {
    'use strict';

    angular.module('blocks.auth')
        .provider('auth', auth);

    function auth() {
        var config = {
            loginUrl: '',
            logoutUrl: '',
            afterLogoutUrl: '',
            afterLoginUrl: '/'
        };

        this.setLogoutUrl = function (url) {
            config.logoutUrl = url;
        };

        this.setLoginUrl = function (url) {
            config.loginUrl = url;
        };

        this.setAfterLogoutUrl = function (url) {
            config.afterLogoutUrl = url;
        };

        this.$get = function ($http, $sanitize, $location, toastr, $cookieStore) {
            return new AuthService($http, config, $sanitize, $location, toastr, $cookieStore);
        };

    }

    function AuthService($http, config, $sanitize, $location, toastr, $cookieStore) {
        this.login = login;
        this.logout = logout;

        function login(username, password) {
            $http({
                withCredentials: true,
                method: 'POST',
                url: config.loginUrl + '?username=' + $sanitize(username) + '&password=' + $sanitize(password)
            })
                .success(function (data) {
                    toastr.success('Welcome ' + username, 'Success');
                    $cookieStore.put('user', data);
                    $location.path(config.afterLoginUrl);
                }).error(function (data, status) {
                    toastr.error('Provided username or password are not valid.', 'Invalid credentials');
                })
        }

        function logout() {
            toastr.success('Bye Bye');
            $http({withCredentials: true, method: 'GET', url: config.logoutUrl});
            $cookieStore.remove('user');
            $location.path(config.afterLogoutUrl);
        }
    }
})();