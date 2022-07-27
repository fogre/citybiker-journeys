const { connectToDatabase } = require('../db/sequelize')

/*
  ../../docker-compose.dev.yml needs to be running,as it provides the test database.
  This also makes sure the test DB can be connected into
*/
module.exports = async () => {
  await connectToDatabase()
}