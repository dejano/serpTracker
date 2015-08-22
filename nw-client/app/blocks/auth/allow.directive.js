(function () {
    'use strict';

    angular.module('blocks.auth').directive('smurfAllow', smurfAllow);

    smurfAllow.$inject = ['$cookies'];
    function smurfAllow($cookies) {
        var directive = {
            restrict: 'A',
            priority: 1000,
            link: link
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.$watch(function () {
                return $cookies.user;
            }, function (newValue, oldValue) {
                modifyDom();
            });

            function modifyDom() {
                if (!$cookies.user) {
                    //$element.remove();
                    $element.css('display', 'none');
                    return;
                }

                var attribute = $attrs.smurfAllow;
                var user = JSON.parse($cookies.user);
                var allow = false;
                var exploded = attribute.split('.');
                var type = exploded[0];

                // permission based type
                if (type == 'permission') {
                    var operation = exploded[1];
                    var object = exploded[2];
                    angular.forEach(user.roles, function (role) {

                        angular.forEach(role.permissions, function (permission) {

                            angular.forEach(permission.actions, function (action) {
                                if (action.operation.name == operation && action.object.name == object) {
                                    allow = true;
                                }
                            })

                        })

                    });
                }
                // role based type
                else if (type == 'role') {
                    var explodedRoles = exploded[1].split('||');
                    var roles = [];
                    roles.push(explodedRoles[0].trim());
                    if (explodedRoles.length > 1) {
                        for (var i = 1; i < explodedRoles.length; i++) {
                            roles.push(explodedRoles[i].trim());
                        }
                    }
                    angular.forEach(user.roles, function (role) {

                        angular.forEach(roles, function (roleName) {
                            console.log(roleName +":" + role.name);
                            if (role.name == roleName) {
                                allow = true;
                            }
                        })

                    });
                    console.log(roles);
                }

                if (!allow) {
                    //$element.remove();
                    $element.css('display', 'none');
                } else {
                    $element.css('display', 'block');
                    //$('.navbar-right').append($element);
                }
            }
        }
    }
})();