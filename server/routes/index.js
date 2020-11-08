
module.exports = app => {
  var express = require('express');
  var router = express.Router();
  const jwt = require('jsonwebtoken')
  const fs = require('fs')
  const path = require('path')
  const responceClient = require('../util/responceClient')
  const tag = require('../models/tag')
  const category = require('../models/category')
  const resourceMiddleware = require('../middleware/resource')
  const authoritMiddleware = require('../middleware/authority')
  const user = require('../models/user')
  const userInfo = require('../models/userInfo')
  const viewsAmount = require('../models/viewsAmount')
  app.set('jiandong-blog', 'liqiongqiongye')
  /* GET home page. */
  router.get('/', async (req, res, next) => {
    let data
    if(/article/.test(req.originalUrl)){
      data = await req.model.find().populate('tags')
    }else if(/recommend/.test(req.originalUrl)) {
      data = await req.model.find().populate('category')
    }else {
      data = await req.model.find()
    }
    responceClient(res, data);
  });

  router.post('/', async (req, res) => {
    const data = await req.model.create(req.body)
    responceClient(res, data);
  })

  router.delete('/:id', async (req, res) => {
    const result = await req.model.findById(req.params.id)
    let imgUrl = null
    if(result.imageUrl) {
      imgUrl = result.imageUrl.split('/').pop()
    }
    imgUrl && fs.unlink(path.join(__dirname, `../uploads/${imgUrl}`), function(error) {
      if(error) {
        console.log(error)
      }else {
        console.log('删除成功')
      }
    })
    const data = await req.model.findByIdAndDelete(req.params.id)
    responceClient(res, data);
  })

  router.get('/:id', async (req, res) => {
    const data = await req.model.findById(req.params.id)
    responceClient(res, data);
  })

  router.put('/:id', async (req, res) => {
    const data = await req.model.update({_id: req.params.id}, req.body)
    responceClient(res, data);
  })

  app.use('/admin/api/rest/:resource', resourceMiddleware(), authoritMiddleware(), router);

  app.get('/admin/api/viewsAmount', async (req, res) => {
    const data = await viewsAmount.find({$and: [{createTime: {$gt: Date.now() - 30*24*3600*1000}}, {createTime: {$lt: Date.now()}}]})
    responceClient(res, data);
  })

  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `https://jdqiong.cn/uploads/${file.filename}`
    res.send(file)
  })
  app.post('/admin/api/login', async (req, res) => {
    // await user.create({username: 'admin', password: 'fjd925843'})
    const { username, password} = req.body
    const adminUser = await user.findOne({username})
    // await userInfo.create({user: adminUser._id, roles: ['admin'], name: 'jiandong'})
    if(!adminUser) {
      responceClient(res, {}, 422, '用户名错误')
      return
    }
    const adminPass = adminUser.password === password
    if (!adminPass) {
      responceClient(res, {}, 422, '密码错误')
      return
    }
    const token = jwt.sign({id: adminUser._id} ,app.get('jiandong-blog'))
    responceClient(res, {token})
  })

  app.get('/admin/api/info', async (req, res) => {
    const { id } = jwt.verify(req.query.token, app.get('jiandong-blog'))
    const info = await userInfo.findOne({user: id})
    responceClient(res, info)
  })

  app.post('/admin/api/logout', async (req, res) => {
    responceClient(res)
  })
}