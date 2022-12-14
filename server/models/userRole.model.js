'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define('UserRole', {
    UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    RoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
  }, {
    timestamps: false
  });
  UserRole.associate = function(models) {
    UserRole.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'});
    UserRole.belongsTo(models.Role, {foreignKey: 'RoleId', targetKey: 'id'});
  };
  return UserRole;
};