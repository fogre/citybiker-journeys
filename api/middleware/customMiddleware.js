/**
 * @describe Filtering middleware. Sets req.filter values {type, field, value} (i.e. filter=gte:distance:100)
 */
const filteringMw = (req, res, next) => {
  if (req.query.filter) {
    const splitted = req.query.filter.split(':')
    const type = splitted[0]
    const field = splitted[1]
    const value = splitted[2]
    if (type && field && value) {
      req.filtering = { type, field, value }
    }
  }
  next()
}

/**
 * @describe Ordering middleware. Sets req.order (i.e. sort_by=id&order_by=ASC)
 */
const orderMw = (req, res, next) => {
  if (req.query.sort_by && req.query.order_by) {
    req.order = [[req.query.sort_by, req.query.order_by]]
  } else if (req.query.sort_by) {
    req.order = [[req.query.sort_by, 'DESC']]
  } else {
    req.order = [['id', 'DESC']]
  }
  next()
}

/**
 * @describe Pagination middleware. Sets req.offset and req.limit (i.e. offset=10&limit=2)
 */
const paginationMw = (req, res, next) => {
  if (req.query) {
    if (req.query.offset) {
      req.offset = req.query.offset
    }
    if (req.query.limit) {
      req.limit = req.query.limit
    }
  } else {
    req.limit = 50
    req.offset = 0
  }
  next()
}

module.exports = {
  filteringMw,
  orderMw,
  paginationMw
}