'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    static associate() {}
  }
  user_role.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        primaryKey: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'user_role',
      timestamps: false
    }
  )
  return user_role
}
