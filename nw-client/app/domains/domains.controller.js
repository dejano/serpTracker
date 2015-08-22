(function () {
    'use strict';

    angular.module('app.domains')
        .controller('domainsController', domainsController)

    domainsController.$inject = ['$scope', 'domains', 'dataService', 'toastr'];
    function domainsController($scope, domains, dataService, toastr) {
        $scope.domains = domains.result;
        $scope.deleteDomain = deleteDomain;
        ///////////////

        function deleteDomain(toDelete) {
            return dataService.domains.delete({id: toDelete.id}).$promise.then(function (data) {
                console.log(data);
                if (data.result.success) {
                    $scope.domains.forEach(function (domain) {
                        if (domain.id === toDelete.id) {
                            $scope.domains.splice( $scope.domains.indexOf(toDelete), 1 );
                        }
                    });
                }
                toastr.info('Successfully delete domain.', 'Deleted');
            });
        }
    }

})();