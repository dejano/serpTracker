'use strict';

module.exports = Transformer;

function Transformer(keywords) {

    var transformer = {
        transform: transform
    };

    return transformer;
    ////////////////////

    function transform() {
        if (Array.isArray(keywords)) {
            var array = [];
            keywords.forEach(function (keyword) {
                array.push(process(keyword));
            });
            return array
        }

        return process(keywords);
    }

    function process(keyword) {
        var transformed = {};
        transformed.id = keyword.id;
        transformed.name = keyword.name;
        return transformed;
    }
}