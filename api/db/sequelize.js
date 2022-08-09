const Sequelize = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')
const { DATABASE_URL, ENV } = require('../utils/config')

const logQueries = ENV === 'development' ? true : false
const sequelize = new Sequelize(DATABASE_URL, {
  logging: logQueries
})

/**
 * @description checks database connection and run migrations
 * @throws error and exists if no db connection
 * @returns null
 */
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('database connected')
  } catch (e) {
    console.log('connecting database failed', e)
    return process.exit(1)
  }
  return null
}

/*Migrations*/
const migrationConf = {
  migrations: {
    glob: ['migrations/*.js', { cwd: __dirname }]
  },
  storage: new SequelizeStorage({
    sequelize, tableName: 'migrations'
  }),
  context: sequelize.getQueryInterface(),
  logger: console
}

/**
 * @description run migrations
 * @returns {void}
 */
const runMigrations = async () => {
  const uzmugMigrator = new Umzug(migrationConf)
  const migrations = await uzmugMigrator.up()
  console.log('Migrations up to date', {
    files: migrations.map(mig => mig.name)
  })
}

module.exports = {
  sequelize,
  connectToDatabase
}