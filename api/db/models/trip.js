const { Model, DataTypes } = require('sequelize')
const Joi = require('joi')
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

const tripSchema = Joi.object({
  departureStation: Joi.number().integer().required(),
  returnStation: Joi.number().integer().required(),
  distance: Joi.number().integer().min(10).required(),
  time: Joi.number().integer().min(10).required(),
  date: Joi.string().isoDate().required()
})

module.exports = {
  Trip,
  tripSchema
}