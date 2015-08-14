'use strict';
var model = require('../core/models');
var serpTracker = require('../core/serpService');

module.exports = keywordController;

function keywordController() {
    var methods = {
        rank: rank,
        rankAll: rankAll,
        history: history
    };

    return methods;
    //////////////

    function history(req, res, next) {
        try {
            model.Domain.getRankHistory(req.params.domainId, req.params.keywordId, function (data) {
                res.json(data);
                res.end();
            });
        } catch (err) {
            next(err);
        }
    }

    function rank(req, res, next) {
        var domainId = req.params.domainId;
        var keywordId = req.params.keywordId;
        model.Domain.findById(domainId, {
            include: [
                {
                    model: model.Keyword,
                    as: 'Keywords',
                    where: {id: keywordId}
                }
            ]
        }).then(function (domain) {
            var google = new serpTracker.Google(domain.Keywords[0].name, domain.name, callback);
            google.track();
            //SerpTracker.track(domain.Keywords[0].name, domain.name, callback);

            function callback(data) {
                // check for error
                if (data.result.error) {
                    res.json(data);
                    res.end();
                    return;
                }

                model.Position.create({
                    rank: data.result.position,
                    DomainHasKeywordId: domain.Keywords[0].DomainHasKeyword.id
                }).then(function (rankRecord) {
                    res.json(rankRecord.get());
                    res.end();
                });
            }
        }).catch(function (err) {
            next(err);
        });
    }

    function rankAll(req, res, next) {
        var domainId = req.params.id;
        model.Domain.findById(domainId, {
            include: [
                {
                    model: model.Keyword,
                    as: 'Keywords'
                }
            ]
        }).then(function (domain) {
            var result = [];
            res.writeHead(200, {'Content-Type': 'application/json'});
            var len = domain.Keywords.length;
            for (var i = 0; i < len; i++) {
                doSetTimeout(i);
            }

            function doSetTimeout(i) {
                setTimeout(function () {
                    var google = new serpTracker.Google(domain.Keywords[i].name, domain.name, callback);
                    google.track();
                }, 5000);
            }

            function callback(data) {
                //console.log(data);
                var id = 0;
                for (var i = 0; i < len; i++) {
                    if (domain.Keywords[i].name === data.result.keyword) {
                        id = domain.Keywords[i].id;
                        break;
                    }
                }
                model.Position.create({
                    rank: data.result.position,
                    DomainHasKeywordId: id
                }).then(function (rankRecord) {
                    result.push(rankRecord.get());
                    if (result.length === len) {
                        res.write(JSON.stringify(result));
                        res.end();
                    }
                });
            }
        }).catch(function (err) {
            next(err);
        });
    }
}