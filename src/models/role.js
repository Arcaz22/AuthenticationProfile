'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.belongsToMany(models.user, {
        through: 'user_roles',
        foreignKey: 'role_id',
        as: 'users',
        onDelete: 'CASCADE'
      })
    }
  }
  role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'role',
      timestamps: false
    }
  )
  return role
}
