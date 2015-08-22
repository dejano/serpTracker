'use strict';
var keywordTransformer = require('./keyword.transformer.js');

module.exports = Transformer;

function Transformer(domains) {
    var transformKeywords = false;

    var transformer = {
        withKeywords: withKeywords,
        transform: transform
    };

    return transformer;
    ////////////////////

    function withKeywords() {
        transformKeywords = true;
        return this;
    }

    function transform() {
        if (Array.isArray(domains)) {
            var array = [];
            domains.forEach(function (domain) {
                array.push(process(domain));
            });
            return array
        }
        return process(domains);
    }

    function process(domain) {
        var transformed = {};
        transformed.id = domain.id;
        transformed.name = domain.name;
        if (transformKeywords && domain.Keywords !== undefined) {
            transformed.keywords = [];
            transformed.keywords.push(keywordTransformer(domain.Keywords).transform());
        }
        return transformed;
    }
}