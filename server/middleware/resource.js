module.exports = app => {
  return function(req, res, next) {
    req.model = require(`../models/${req.params.resource}`)
    next()
  }
}