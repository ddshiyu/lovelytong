module.exports = app => {
  return async (req, res, next) => {
    const jwt = require('jsonwebtoken')
    const userInfo = require('../models/userInfo')
    const responceClient = require('../util/responceClient')
    const { id } = jwt.verify(req.headers['authorization'], req.app.get('jiandong-blog'))
    const info = await userInfo.findOne({user: id})
    if(req.method === 'PUT' || req.method === 'DELETE' || req.method === 'POST') {
      if(info.roles[0] !== 'admin') {
        responceClient(res, {}, 422, '权限不够')
        return
      }
    }
    await next()
  }
}