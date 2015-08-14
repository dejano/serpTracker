(function () {
    'use strict';

    angular.module('app.domains')
        .controller('domainController', domainController)

    domainController.$inject = ['$scope', 'domain', 'dataService', '$log', '$modal', '$route', 'toastr', '$location', 'moment'];
    function domainController($scope, domain, dataService, $log, $modal, $route, toastr, $location, moment) {
        console.log(domain);
        $scope.domain = domain.result;
        $scope.approve = approve;

        $scope.reject = reject;
        $scope.showChart = showChart;

        // update domain modal
        $scope.openUpdateModal = openUpdateModal;

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
            //[28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        ///////////////
        function showChart(keywordId) {
            dataService.keywords.get({
                keywordId: keywordId,
                domainId: $route.current.params.id
            }).$promise.then(function (data) {
                    var history = data.result;
                    console.log(history);
                    var dates = [];
                    var ranks = [];
                    history.keyword.history.forEach(function (data) {
                        dates.push(moment(new Date(data.lastUpdate)).fromNow());
                        ranks.push(data.position);
                    });
                    $scope.labels = dates;
                    $scope.data = [ranks];
                    $scope.series = [history.keyword.name];
                })

        }

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