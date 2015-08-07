'use strict';

module.exports = function (sequelize, DataTypes) {
    var Position = sequelize.define('Position', {
        rank: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Position.belongsTo(models.DomainHasKeyword);
            }
        }
    });
    return Position;
};