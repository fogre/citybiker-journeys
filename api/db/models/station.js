const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize')

class Station extends Model {}

Station.init({
  id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  coordinateY: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'station'
})

