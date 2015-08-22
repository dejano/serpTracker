(function () {
    'use strict';

    angular.module('app.domains')
        .directive('rankArrow', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var rank = attrs.rankArrow;
                    if (rank > 0) {
                        element.append('<i class="fa fa-arrow-up label-spaced-icon icon-small"></i>');
                    } else if (rank < 0) {
                        element.append('<i class="fa fa-arrow-down label-spaced-red-icon icon-small"></i>');
                    }
                }
            };
        });

})();