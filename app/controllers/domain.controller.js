'use strict';
var model = require('../core/models');
var domainTransformer = require('../transformers/domain.transformer.js');
var serpTracker = require('../core/serpService');

module.exports = domainController;

function domainController() {
    var methods = {
        getAll: getAllDomains,
        get: getDomain,
        create: createDomain,
        delete: deleteDomain,
        update: updateDomain
    };

    return methods;
    //////////////

    function getAllDomains(req, res, next) {
        model.Domain.findAll().then(function (domains) {
            res.json({result: domainTransformer(domains).transform()});
        }).catch(function (err) {
            next(err);
        });
    }

    function getDomain(req, res, next) {
        model.Domain.getDomainWithKeywords(req.params.id, function (data) {
            res.json(data);
            res.end();
        });
    }

    function createDomain(req, res, next) {
        // create domain
        model.Domain.create({name: req.body.name})
            .then(function (domain) {
                // create keywords
                var keywords = req.body.keywords;
                var keywordIds = [];
                var len = keywords.length;
                keywords.map(function (keyword, i) {
                    model.Keyword.create(keyword).then(function (result) {
                        keywordIds.push(result.id);
                        if (len - 1 == i) {
                            domain.setKeywords(keywordIds).then(function () {
                                res.json({result: domain});
                            }).catch(function (err) {
                                next(err);
                            });
                        }
                    }).catch(function (err) {
                        next(err);
                    });
                });
            }).catch(function (err) {
                next(err);
            });
    }

    function deleteDomain(req, res, next) {
        model.Domain.destroy({where: {id: req.params.id}}, function (success) {
            console.log(success);
            if (success != 0) {
                res.json({result: {success: true}});
            } else {
                res.json({result: {success: false}});
            }
            res.end();
        }).catch(function (err) {
            next(err);
        })
    }

    function updateDomain(req, res, next) {

    }
}