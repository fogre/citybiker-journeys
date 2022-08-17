const express = require('express')
const cors = require('cors')
require('express-async-errors')

const stationsRouter = require('./routes/stations')
const tripsRouter = require('./routes/trips')
const { connectToDatabase } = require('./db/sequelize')
const { PORT, ENV } = require('./utils/config')

//middleware
const app = express()
app.use(cors())
app.use(express.json())

//routes
app.use('/api/stations', stationsRouter)
app.use('/api/trips', tripsRouter)
app.use('/', (req, res) => {
  res.json({ foo: 'bar' })
})

//serve
const startServer = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

if (ENV !== 'test') {
  startServer()
}

module.exports = app