'use strict';

module.exports = function (sequelize, DataTypes) {
    var DomainHasKeyword = sequelize.define('DomainHasKeyword', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                //models.Keyword.hasMany(DomainHasKeyword);
                //models.Domain.hasMany(DomainHasKeyword);
                //DomainHasKeyword.belongsToMany(models.Keyword, {through: 'domain_has_keyword', as: { singular: 'Keyword', plural: 'Keywords' }})
            }
        }
    });
    return DomainHasKeyword;
};