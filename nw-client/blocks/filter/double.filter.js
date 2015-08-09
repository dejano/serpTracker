(function () {
    'use strict';

    angular.module('blocks.filter').filter('doubleFilter', doubleFilter);

    function doubleFilter() {
        return function (items, value, compareOperator, properties) {
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
            return convertToDouble(x) == convertToDouble(y);
        },
        '>': function (x, y) {
            return convertToDouble(x) > convertToDouble(y);
        },
        '<': function (x, y) {
            return convertToDouble(x) < convertToDouble(y);
        }
    };

    function convertToDouble(x) {
        return (Math.round(parseFloat(x) * 100) / 100);
    }

})();