const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize')

class Trip extends Model {}

Trip.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departureStation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'stations', key: 'id' },
  },
  returnStation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'stations', key: 'id' },
  },
  distance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 10
    }
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 10
    }
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'trip'
})