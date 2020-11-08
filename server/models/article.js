const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const articleSchema = new mongoose.Schema({
  title: { type: String, default: '标题' },
  desc: { type: String, default: '这是一段描述'},
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'tag'}],
  imageUrl: { type: String, default: 'http://www.baidu.com'},
  content: { type: String, default: '这里是正文' },
  like: { type: Number, default: 0},// 点赞
  view: { type: Number, default: 0}, // 查看
  comment: { type: Number, default: 0},
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
// 自增 ID 插件配置
articleSchema.plugin(autoIncrement.plugin, {
	model: 'article',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('article', articleSchema)