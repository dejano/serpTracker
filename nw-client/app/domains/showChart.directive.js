(function () {
    'use strict';

    angular.module('app.domains')
        .directive('showChart', function ($timeout) {
            return {
                scope: {callbackFn: '&'},
                link: function (scope, element, attrs) {
                    element.bind('click', function () {
                        $timeout(function () {
                            if (element.hasClass('btn-success')) {
                                element.removeClass('btn-success');
                                element.text('Hide Chart');
                                scope.callbackFn({action: 'show'});
                            } else {
                                element.addClass('btn-success');
                                element.text('Show Chart');
                                scope.callbackFn({action: 'hide'});
                            }
                        });
                    });
                }
            };
        });

})();