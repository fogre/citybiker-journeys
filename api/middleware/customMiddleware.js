/**
 * @describe Pagination middleware. Sets req.offset and req.limit
 */
const paginationMw = (req, res, next) => {
  if (!req.query || !req.query.offset) {
    req.offset = 0
  } else {
    req.offset = req.query.offset
  }

  if (!req.query || !req.query.limit) {
    req.limit = 40
  } else {
    req.limit = req.query.limit
  }
  next()
}

module.exports = {
  paginationMw
}