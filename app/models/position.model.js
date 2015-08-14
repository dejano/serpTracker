'use strict';

module.exports = function (sequelize, DataTypes) {
    var Position = sequelize.define('Position', {
        rank: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                Position.belongsTo(models.DomainHasKeyword);
            }
        }
    });
    return Position;
};