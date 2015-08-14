(function () {
    'use strict';

    angular.module('app.domains')
        .controller('createDomainController', createDomainController)

    createDomainController.$inject = ['$scope', 'dataService', '$log', '$modal', '$route', 'toastr', '$location'];
    function createDomainController($scope, dataService, $log, $modal, $route, toastr, $location) {

        $scope.submit = submit;
        $scope.addKeyword = addKeyword;
        $scope.removeKeyword = removeKeyword;

        activate();
        ////////////////

        function activate() {
            $scope.domain = {};
            $scope.domain.keywords = [];
        }

        function submit(isValid) {
            console.log($scope.domain);

            if (!isValid) {
                toastr.error('Provided data isn\'t valid. Is it?', 'Ops!');
                return;
            }

            if ($scope.domain === undefined || !$scope.domain.keywords.length) {
                toastr.error('Something went wrong. Provided data might not be valid. Is it?', 'Ops!');
                return;
            }

            //dataService.Invoice.create($scope.invoice).success(function () {
            //    $location.path('/invoices/pending');
            //}).error(function () {
            //    toastr.error('Something went wrong. Provided data might not be valid. Is it?', 'Ops!');
            //});

        }

        function addKeyword() {
            $scope.domain.keywords.push({});
        }

        function removeKeyword(index) {
            console.log(index);
            if (index > -1) {
                $scope.domain.keywords.splice(index, 1);
            }
        }
    }

})();