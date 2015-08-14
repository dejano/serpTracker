(function () {
    'use strict';

    angular.module('app.domains')
        .controller('domainsController', domainsController)

    domainsController.$inject = ['$scope', 'domains', 'dataService', '$log', '$modal', '$route', 'toastr', '$location'];
    function domainsController($scope, domains, dataService, $log, $modal, $route, toastr, $location) {
        $scope.domains = domains.result;
        $scope.approve = approve;
        $scope.reject = reject;

        // update domain modal
        $scope.openUpdateModal = openUpdateModal;

        ///////////////

        function successCallback(title, message) {
            toastr.success(message, title);
            $location.path("/");
        }

        function reject() {
            dataService.Invoice.reject($scope.domain._id).success(successCallback('Invoice successfully rejected'))
        }

        function approve() {
            dataService.Invoice.approve($scope.domain).success(function () {
                toastr.success('', 'Invoice successfully approved');
                $location.path("/");
            });
        }

        function openUpdateModal(invoice) {
            var invoiceToEdit = angular.copy(domain);
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'invoices/update-domain.html',
                controller: 'updateInvoiceModalController',
                resolve: {
                    invoice: function () {
                        return invoiceToEdit;
                    }
                }
            });

            modalInstance.result.then(function (invoice) {
                dataService.Invoice.update(domain).success(function (data) {
                    console.log(data);
                    console.log($scope.domain);
                    $route.reload();
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

})();