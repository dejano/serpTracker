'use strict';
var model = require('../core/models');
var domainTransformer = require('./domain.transformer');

module.exports = domainController();

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
        })
    }

    function getDomain(req, res, next) {
        model.Domain.findById(req.params.id, {
            include: [{
                model: model.Keyword,
                as: 'Keywords'
            }]
        }).then(function (domain) {
            if (domain === null) {
                var err = new Error('Domain does not exist.');
                err.status = 404;
                next(err);
                return;
            }
            res.json({result: domainTransformer(domain).withKeywords().transform()});
        }).catch(function (err) {
            next(err);
        });
    }

    function createDomain(req, res, next) {
        // create domain

        model.Domain.create({name: req.body.name})
            .then(function (domain) {
                // create keywords
                model.Keyword.bulkCreate(req.body.keywords).then(function () {
                    var keywordNames = req.body.keywords.map(function (item) {
                        return item.name
                    });
                    model.Keyword.findAll({where: {name: {$in: keywordNames}}}).then(function (keywords) {
                        // associate
                        domain.setKeywords(keywords).then(function () {
                            res.json({result: domain});
                        })
                    })
                });

            }).catch(function (err) {
                next(err);
            });
    }

    function deleteDomain(req, res, next) {

    }

    function updateDomain(req, res, next) {

    }

}