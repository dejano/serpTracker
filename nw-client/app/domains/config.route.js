(function () {
    'use strict';

    angular
        .module('app.domains')
        .run(appRun);

    appRun.$inject = ['routeHelper'];
    function appRun(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/domains',
                config: {
                    templateUrl: 'app/domains/domains.html',
                    controller: 'domainsController',
                    title: 'Domains',
                    resolve: {
                        domains: getDomains
                    }
                }
            },
            {
                url: '/domains/create',
                config: {
                    templateUrl: 'app/domains/create.html',
                    controller: 'createDomainController',
                    title: 'Create domain'
                    //resolve: {
                    //    domain: getDomain
                    //}
                }
            },
            {
                url: '/domains/:id',
                config: {
                    templateUrl: 'app/domains/domain.html',
                    controller: 'domainController',
                    title: 'Domains',
                    resolve: {
                        domain: getDomain
                    }
                }
            }
        ];
    }

    getDomains.$inject = ['dataService'];
    function getDomains(dataService) {
        return dataService.domains.get().$promise.then(function (data) {
            return data;
        });
    }

    getDomain.$inject = ['dataService', '$route'];
    function getDomain(dataService, $route) {
        return dataService.domains.get({ id: $route.current.params.id }).$promise.then(function (data) {
            return data;
        });
    }


})();
