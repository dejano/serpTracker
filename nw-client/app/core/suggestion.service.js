(function () {
    'use strict';
    angular.module('app.core')
        .factory('suggestionService', suggestionService);

    suggestionService.$inject = ['$http'];
    function suggestionService($http) {
        var url = 'http://suggestqueries.google.com/complete/search?output=firefox&hl=en&q=';

        return {
            get: suggest
        };

        function suggest(keyword) {
            return $http.get(url + keyword);
        }
    }

})();
