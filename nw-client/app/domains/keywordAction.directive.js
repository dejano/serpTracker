(function () {
    'use strict';

    angular.module('app.domains')
        .directive('keywordAction', function ($timeout) {
            return {
                scope: {callbackFn: '&'},
                link: function (scope, element, attrs) {
                    element.bind('click', function () {
                        $timeout(function () {
                            if (element.hasClass('label-primary')) {
                                element.removeClass('label-primary');
                                element.addClass('label-danger');
                                scope.callbackFn({action: 'addKeyword'});
                            } else {
                                element.addClass('label-primary');
                                element.removeClass('label-danger');
                                scope.callbackFn({action: 'removeKeyword'});
                            }

                        });
                    });
                }
            };
        });

})();