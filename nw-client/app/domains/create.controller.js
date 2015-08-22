(function () {
    'use strict';

    angular.module('app.domains')
        .controller('createDomainController', createDomainController)

    createDomainController.$inject = ['$scope', 'dataService', '$log', '$modal', '$route', 'toastr', '$location'];
    function createDomainController($scope, dataService, $log, $modal, $route, toastr, $location) {

        $scope.submit = submit;
        $scope.suggestKeywords = suggestKeywords;
        $scope.updateKeywords = updateKeywords;

        activate();
        ////////////////

        function activate() {
            $scope.domain = {};
            $scope.domain.keywords = '';
            $scope.suggestedKeywords = [];
            $scope.className = 'label-primary';
        }

        function submit(isValid) {


            if (!isValid) {
                toastr.error('Provided data isn\'t valid. Is it?', 'Ops!');
                return;
            }

            if ($scope.domain === undefined || !$scope.domain.keywords.length) {
                toastr.error('Something went wrong. Provided data might not be valid. Is it?', 'Ops!');
                return;
            }

            var keywords = $scope.domain.keywords.split(',').map(function (keyword) {
                return {name: keyword};
            });
            var postData = {
                name: $scope.domain.name,
                keywords: keywords,
                description: $scope.domain.description
            };
            console.log(postData);

            dataService.domains.save(postData).$promise.then(function (data) {
                console.log(data);
                dataService.keywords.save(null, {domainId: data.result.id}).$promise.then(function (res) {
                    console.log(res);
                    $location.path('/domains/' + data.result.id);
                }, function (err, data) {
                    console.log(err);
                    toastr.error('Something went wrong. ' + '\n' + err.data.message, 'Ops!');
                });

            }, function (err) {
                console.log(err);
                toastr.error('Something went wrong. ' + '\n' + err.data.message, 'Ops!');
            });

        }

        function suggestKeywords() {
            if ($scope.domain === undefined || !$scope.domain.keywords.length) {
                toastr.error('Please provide at least one keyword', 'Ops!');
                return;
            }

            if ($scope.suggestedKeywords.length > 100) {
                toastr.error('You want moar? Wat?', 'Ops!');
                return;
            }

            var splited = $scope.domain.keywords.split(',');
            console.log($scope.domain.keywords);
            splited.forEach(function (keyword) {
                dataService.getS(keyword)
                    .then(function (data) {
                        console.log(data.data[1]);
                        var toAdd = data.data[1].filter(function (n) {
                            return $scope.suggestedKeywords.indexOf(n) === -1;
                        });
                        $scope.suggestedKeywords = $scope.suggestedKeywords.concat(toAdd);
                    }, function (err) {
                        console.log(err);
                    });
            });
        }

        function updateKeywords(action, index) {
            if (action === 'addKeyword') {
                addKeyword($scope.suggestedKeywords[index]);
            } else {
                removeKeyword($scope.suggestedKeywords[index]);
            }
        }

        function addKeyword(keyword) {
            var splited = $scope.domain.keywords.split(',');

            if (splited.indexOf(keyword) > -1) return;
            if ($scope.domain.keywords.length)
                $scope.domain.keywords += ',';
            $scope.domain.keywords += keyword;
            //$scope.className = 'label-danger';
        }

        function removeKeyword(keyword) {
            var indexPosition = $scope.domain.keywords.indexOf(keyword);
            $scope.domain.keywords = $scope.domain.keywords.replace(keyword, '');
            $scope.domain.keywords = $scope.domain.keywords.slice(0, indexPosition - 1) + $scope.domain.keywords.slice(indexPosition);
            //$scope.className = 'label-primary';
        }

    }

})();