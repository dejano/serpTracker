'use strict';
module.exports = function (sequelize, DataTypes) {
    var Keyword = sequelize.define('Keyword', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                //Keyword.belongsTo(models.Domain, {
                //    onDelete: "CASCADE",
                //    foreignKey: {
                //        allowNull: false
                //    }
                //});
                Keyword.belongsToMany(models.Domain, {
                    through: 'DomainHasKeyword',
                    as: {singular: 'Domain', plural: 'Domains'}
                })
            }
        }
    });
    return Keyword;
};