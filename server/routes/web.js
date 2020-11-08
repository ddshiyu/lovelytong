module.exports = app => {
  var express = require('express');
  var router = express.Router();
  const axios = require('axios')
  const mongoose = require('mongoose')
  const querystring = require('querystring')
  const responceClient = require('../util/responceClient')
  const recommend = require('../models/recommend')
  const cateogry = require('../models/category')
  const article = require('../models/article')
  const tag = require('../models/tag')
  const experience = require('../models/experience')
  const about = require('../models/about')
  const webUser = require('../models/webUser')
  const comment = require('../models/comment')
  const issue = require('../models/issue')
  const viewsAmount = require('../models/viewsAmount')
  function formatDate(dt) {
    const date = new Date(dt)
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    return y + m + d
  }
  router.get('/recommend', async (req, res) => {
    const data = await recommend.find().populate('category').sort({priority: 1})
    responceClient(res, data)
  })
  router.get('/category', async (req, res) => {
    const data = await cateogry.find()
    responceClient(res, data)
    const date = Date.now()
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    console.log(ip)
    const preIp = await viewsAmount.find({ip})
    const lastIP = preIp[preIp.length - 1]
    if(preIp.length) {
      if(date - new Date(lastIP.createTime).getTime() > 2 * 3600 * 1000) {
        await viewsAmount.create({ip,location: lastIP.location})
      }
    }else {
      let location = await axios.get(`http://apis.juhe.cn/ip/ipNew?ip=${ip.split(',')[0]}&key=411ddd22d890ac86878ed3d09cbf69a1`)
      console.log(location)
      if(location.data.resultcode === '200') {
        location = location.data.result.Country + location.data.result.Province + location.data.result.City
      }else {
        location = '超过城市'
      }
      await viewsAmount.create({ip,location})
    }
  })

  router.get('/article', async (req, res) => {
    const data = await article.find().populate('tags').sort({"createTime": -1})
    responceClient(res, data)
  })

  router.get('/articleDetail', async (req, res) => {
    const data = await article.findById(req.query.id).populate('tags')
    await article.update({_id: req.query.id}, {$inc: {view: 1}})
    const commentData = await comment.find({article_id: data._id})
    data.comment = commentData.length
    responceClient(res, data)
  })

  router.get('/hotMess', async (req, res) => {
    const data = await axios.get('https://www.v2ex.com/api/topics/hot.json')
    responceClient(res, data.data)
  })

  router.get('/tag', async (req, res) => {
    const data = await tag.find()
    responceClient(res, data)
  })

  router.get('/articleByTag', async (req, res) => {
    const tagId = mongoose.Types.ObjectId(req.query.tagId)
    const data = await article.find({tags: {$elemMatch:{$eq: tagId}}})
    responceClient(res, data)
  })

  router.get('/course', async (req, res) => {
    const data = await experience.find({}).sort({"createTime": -1})
    responceClient(res, data)
  })

  router.get('/about', async (req, res) => {
    const data = await about.findOne()
    responceClient(res, data)
  })

  router.get('/learningData', async (req, res) => {
    const { page } = req.query
    const data = await axios.get(`https://gank.io/api/v2/data/category/Girl/type/Girl/page/${page}/count/10`)
    responceClient(res, data.data)
  })
  
  const clientId = '663c17b91af374a10228'
  const clientSecret = '1bb80040a8e45fb481b733f2f365d064665372e9'

  router.get('/login', async (req, res) => {
    const code = req.query.code
    let userInfo
    let data = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    })
    const access_token = querystring.parse(data.data).access_token
    try{
      userInfo = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
    }catch(error) {
      console.log(error)
    }
    const user = await webUser.find({access_id: userInfo.data.id})
    if(user.length === 0) {
      const oneUser = new webUser({access_id: userInfo.data.id, name:userInfo.data.name, avatar: userInfo.data.avatar_url})
      oneUser.save((err, doc) => {
        if(err) {
          console.log(err)
        }
      })
    }
    responceClient(res, userInfo.data)
  })

  router.post('/sendComment', async (req, res) => {
    const params = req.body
    const user = await webUser.findOne({access_id: params.webUser})
    params.webUser= mongoose.Types.ObjectId(user._id)
    const data = await comment.create(params)
    await article.updateOne({_id: params.article_id}, {$inc: {'comment': 1}})
    responceClient(res, data)
  })

  router.get('/getComment', async (req, res) => {
    const { article_id } = req.query
    const data = await comment.find({article_id}).populate('webUser').sort({"createTime": -1})
    responceClient(res, data)
  })

  router.get('/issue', async (req, res) => {
    const data = await issue.find().populate('webUser').sort({"createTime": -1})
    responceClient(res, data)
  })

  router.post('/issue', async (req, res) => {
    const params = req.body
    const user = await webUser.findOne({access_id: params.webUser})
    params.webUser= mongoose.Types.ObjectId(user._id)
    const data = await issue.create(params)
    responceClient(res, data)
  })

  router.post('/location', async (req, res) => {

  })

  app.use('/web/api', router)
}