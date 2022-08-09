const fs = require('fs')
const { parse } = require('csv-parse')

/**
  * @function insertCsvToDb
  * @returns {void}
  * @description inserts csv file to database
  * @param Model a Sequelize model to bulkInsert
  * @param parseValidateFunction function to parse and validate the line object for db
  * @param filePath csv file location
*/
const insertCsvToDb = async (Model, parseValidateFunction, filePath) => {
  let queue = []
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({
      columns: true,
      skip_empty_lines: true,
      trim: true
    }))

  for await (const line of parser) {
    const validatedLine = parseValidateFunction(line)
    if (validatedLine) {
      queue.push(validatedLine)
      if (queue.length >= 1000) {
        await Model.bulkCreate(queue)
        queue = []
      }
    }
  }

  if (queue.length) {
    await Model.bulkCreate(queue)
  }
}

module.exports = {
  insertCsvToDb
}