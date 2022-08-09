const { DataTypes } = require('sequelize')

module.exports = {
  up: async({ context: queryInterface }) => {
    await queryInterface.createTable('stations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinate_x: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinate_y: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })

    await queryInterface.createTable('trips', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      departure_station: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' },
      },
      return_station: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' },
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  },

  down: async({ context: queryInterface }) => {
    await queryInterface.dropTable('trips')
    await queryInterface.dropTables('stations')
  },
}