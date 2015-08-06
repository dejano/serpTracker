'use strict';

module.exports = function (sequelize, DataTypes) {
    var Domain = sequelize.define('Domain', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Domain.belongsToMany(models.Keyword, {through: 'domain_has_keyword', as: { singular: 'Keyword', plural: 'Keywords' }})
            }
        }
    });
    return Domain;
};