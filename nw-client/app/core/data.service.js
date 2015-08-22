(function () {
    'use strict';

    angular.module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$resource', '$http', '$rootScope', '$log', 'toastr', '$q'];
    function dataService($resource, $http, $rootScope, $log, toastr, $q) {
        var cachedQueries = {};
        var url = 'http://suggestqueries.google.com/complete/search?output=chrome&jsonp=JSON_CALLBACK&hl=en&q=';
        var promise;

        return {
            domains: $resource('http://localhost:3000/api/domains/:id', {}, {
                //query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
            }),
            keywords: $resource('http://localhost:3000/api/domains/:domainId/keywords/:keywordId', {
                domainId: '@domainId',
                keywordId: '@keywordId'
            }, {
                //query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
            }),
            getS: suggest
        };
        function suggest(keyword) {
            if (cachedQueries[keyword] && promise) {
                promise.success(function (data) {
                    data = cachedQueries[keyword];
                    return data;
                });
                return promise;
            }
            promise = $http.jsonp(url + keyword).success(function (data) {
                if (!cachedQueries[keyword]) {
                    cachedQueries[keyword] = data;
                }
            });

            return promise;
            function JSON_CALLBACK(data) {
            }
        }
    }
})();