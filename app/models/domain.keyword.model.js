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
                models.DomainHasKeyword.hasMany(models.Position);
            }
        }
    });
    return DomainHasKeyword;
};