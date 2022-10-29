'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: true
      }
    },
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 
    },
    lastActivyDate: DataTypes.DATE,
    createdDate: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    
  };
  return User;
};