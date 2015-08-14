(function () {
    'use strict';

    angular.module('blocks.filter').filter('dateFilter', dateFilter);

    function dateFilter() {
        return function (items, value, compareOperator, properties) {
            value = new Date(value);

            if (!value || isNaN(value)) {
                return items;
            }

            var filtered = [];
            var object = null;
            angular.forEach(items, function (item) {
                object = properties ? accessProperties(item, properties) : item;
                if (match[compareOperator.key](object, value)) {
                    filtered.push(item);
                }
            });

            return filtered;
        }
    }

    function accessProperties(object, string){
        var explodedString = string.split('.');
        for (var i = 0, l = explodedString.length; i<l; i++){
            object = object[explodedString[i]];
        }
        return object;
    }

    var match = {
        '==': function (x, y) {
            return convertToDate(x) == y;
        },
        '>': function (x, y) {
            return x > y;
        },
        '<': function (x, y) {
            return x < y;
        },
        '<=': function (x, y) {
            return convertToDate(x) <= y;
        },
        '>=': function (x, y) {
            return convertToDate(x) >= y;
        }
    };

    function convertToDate(x) {
        return new Date(x);
    }

})();