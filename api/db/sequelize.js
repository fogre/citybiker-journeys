const Sequelize = require('sequelize')
const { DATABASE_URL } = require('../utils/config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (e) {
    console.log('connecting database failed', e)
    return process.exit(1)
  }
  return null
}

module.exports = {
  sequelize,
  connectToDatabase
}