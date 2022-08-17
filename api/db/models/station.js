const { Model, DataTypes } = require('sequelize')
const Joi = require('joi')
const { sequelize } = require('../sequelize')

class Station extends Model {}

Station.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'This station already exists',
      fields: ['name']
    },
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  coordinateX: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  coordinateY: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'station'
})

//validation schema
const stationSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  coordinateX: Joi.string().required(),
  coordinateY: Joi.string().required()
})

module.exports =  {
  Station,
  stationSchema
}