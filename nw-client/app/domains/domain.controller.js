(function () {
    var moment = require('moment');
    'use strict';

    angular.module('app.domains')
        .controller('domainController', domainController);

    domainController.$inject = ['$scope', 'domain', 'dataService', '$log', '$window', '$route', 'toastr', '$location'];
    function domainController($scope, domain, dataService, $log, $window, $route, toastr, $location) {
        $scope.domain = domain.result;
        $scope.showChart = showChart;
        $scope.updateRank = updateRank;
        $scope.deleteKeyword = deleteKeyword;

        activate();
        ///////////////

        function activate() {
            $scope.labels = [];
            $scope.series = [];
            $scope.data = [];
            $scope.chartIds = [];
            $scope.greenArrow = '<i class="fa fa-plus label-spaced-icon icon-small"></i>';
            calculate();
            displayCharts();
        }

        function displayCharts() {
            var len = $scope.domain.keywords.length;
            for (var i = 0; i < len; i++) {
                showChart(i);
            }
        }

        function calculate() {
            var today = moment();
            $scope.domain.keywords.forEach(function (keyword) {
                if (keyword.history.length == 1) {
                    keyword.day = '-';
                    keyword.week = '-';
                    keyword.month = '-';
                    keyword.lifetime = '-';
                    return false;
                }

                keyword.day = keyword.history[keyword.history.length - 2].position - keyword.position;
                keyword.lifetime = keyword.history[0].position - keyword.position;

                if (keyword.history.length >= 8) {
                    keyword.week = keyword.history[keyword.history.length - 8].position - keyword.position;
                } else {
                    keyword.week = keyword.lifetime;
                }

                if (keyword.history.length >= 31) {
                    keyword.month = keyword.history[keyword.history.length - 31].position - keyword.position;
                } else {
                    keyword.month = keyword.lifetime;
                }

            });
        }

        function deleteKeyword(toDelete) {
            return dataService.keywords.delete({domainId: $route.current.params.id,keywordId: toDelete.id}).$promise.then(function (data) {
                console.log(data);
                if (data.result.success) {
                    $scope.domain.keywords.forEach(function (keyword) {
                        if (keyword.id === toDelete.id) {
                            $scope.domain.keywords.splice( $scope.domain.keywords.indexOf(toDelete), 1 );
                        }
                    });
                }
                toastr.info('Successfully delete domain.', 'Deleted');
            });
        }

        function updateRank() {
            console.log('update rank');
            var lastUpdate = moment(new Date($scope.domain.keywords[0].lastUpdate)).diff(new Date(), 'hours');
            if (lastUpdate > -24) {
                toastr.error('Update every 24 hours. ' + Math.abs(lastUpdate) + ' hours passed since last update.', 'Update restriction!');
                return;
            }

            dataService.keywords.save(null, {domainId: $scope.domain.id}).$promise.then(function (res) {
                dataService.domains.get({id: $route.current.params.id}).$promise.then(function (data) {
                    $scope.domain = data.result;
                    console.log(data.result);
                    $route.reload();
                });
                //$window.location.reload();
            }, function (err) {
                console.log(err);
                toastr.error('Something went wrong. ' + '\n' + err.message, 'Ops!');
            });
        }

        function showChart(index, action) {

            var keyword = $scope.domain.keywords[index];
            var toRemove = $scope.series.indexOf(keyword.name);
            console.log($scope.series);
            if (toRemove > -1) {
                //$scope.labels = [];
                //$scope.series = [];
                //$scope.data = [];
                var ind = 0;
                $scope.series.map(function(chart, i) {
                    if (chart == keyword.name) {
                        ind = i;
                    }
                });
                console.log(ind);
                $scope.series.splice(ind, 1);
                $scope.data.splice(ind, 1);
                console.log($scope.series);

                return;
            }

            var dates = [];
            var ranks = [];
            var dataId;
            var seriesId;
            keyword.history.forEach(function (data) {
                dates.push(moment(new Date(data.lastUpdate)).fromNow());
                ranks.push(data.position);
            });
            if (!$scope.labels.length) {
                $scope.labels = dates;
            }
            dataId = $scope.data.push(ranks);
            seriesId = $scope.series.push(keyword.name);
            $scope.chartIds.push({keyword: keyword.name, dataId: dataId-1, seriesId: seriesId-1});
        }

    }

})();