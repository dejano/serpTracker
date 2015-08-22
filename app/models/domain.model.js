'use strict';

module.exports = function (sequelize, DataTypes) {
    var Domain = sequelize.define('Domain', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Domain.belongsToMany(models.Keyword, {
                    through: 'DomainHasKeyword',
                    as: {singular: 'Keyword', plural: 'Keywords'}
                })
            },
            getDomainWithKeywords: function (domainId, callback) {
                var query = "SELECT Domains.id, Domains.name,  Keywords.id AS KeywordsId, Keywords.name AS KeywordsName, Positions.rank AS position, Positions.updatedAt AS PositionsUpdatedAt, max(Positions.id) AS max_id FROM Domains LEFT OUTER JOIN DomainHasKeywords ON Domains.id = DomainHasKeywords.DomainId LEFT OUTER JOIN Keywords ON Keywords.id = DomainHasKeywords.KeywordId LEFT OUTER JOIN Positions ON DomainHasKeywords.id =  Positions.DomainHasKeywordId WHERE Domains.id = :domainId group by Keywords.name;";
                Domain.sequelize.query(query, {
                    replacements: {domainId: domainId},
                    type: Domain.sequelize.QueryTypes.SELECT
                }).then(function (domains) {
                    var keywords = [];
                    var result = {};
                    result.id = domains[0].id;
                    result.name = domains[0].name;
                    domains.forEach(function (domain) {
                        var keyword = {
                            id: domain.KeywordsId,
                            name: domain.KeywordsName,
                            position: domain.position,
                            lastUpdate: domain.PositionsUpdatedAt
                        };
                        keywords.push(keyword);
                    });

                    keywords.map(function (keyword, i) {
                        Domain.getRankHistory(domainId, keyword.id, function (data) {
                            keyword.history = data.result.history;
                            if (i === keywords.length - 1) {
                                result.keywords = keywords;
                                callback({result: result});
                            }
                        });
                    });

                });

                return Promise;
            },
            getRankHistory: function (domainId, keywordId, callback) {
                var query = "SELECT Keywords.id AS KeywordsId, Keywords.name AS KeywordsName, Positions.rank AS position, Positions.updatedAt AS PositionsUpdatedAt FROM Domains LEFT OUTER JOIN DomainHasKeywords ON Domains.id = DomainHasKeywords.DomainId LEFT OUTER JOIN Keywords ON Keywords.id = DomainHasKeywords.KeywordId LEFT OUTER JOIN Positions ON DomainHasKeywords.id =  Positions.DomainHasKeywordId WHERE Domains.id = :domainId AND Keywords.id = :keywordId ORDER BY positionsUpdatedAt;";
                Domain.sequelize.query(query, {
                    replacements: {domainId: domainId, keywordId: keywordId},
                    type: Domain.sequelize.QueryTypes.SELECT
                }).then(function (domains) {
                    var history = [];
                    var result = {};
                    result.id = domains[0].KeywordsId;
                    result.name = domains[0].KeywordsName;
                    domains.forEach(function (domain) {
                        var rank = {
                            position: domain.position,
                            lastUpdate: domain.PositionsUpdatedAt
                        };
                        history.push(rank);
                    });
                    result.history = history;
                    callback({result: result});
                });

            }
        }
    });
    return Domain;
};