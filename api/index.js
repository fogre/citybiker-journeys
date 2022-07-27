const express = require('express')
const cors = require('cors')
require('express-async-errors')
const { PORT, ENV } = require('./utils/config')

//middleware
const app = express()
app.use(cors())
app.use(express.json())

//routes
app.use('/', (req, res) => {
  res.json({ foo: 'bar' })
})

//serve
if (ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = app