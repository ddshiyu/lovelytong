const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const aboutSchema = new mongoose.Schema({
  title: { type: String },
  like: { type: Number, default: 0},// 点赞
  view: { type: Number, default: 0}, // 查看
  comment: { type: String, default: '这里是评论'},
  content: { type: String, default: '这里是正文'},
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
aboutSchema.plugin(autoIncrement.plugin, {
	model: 'about',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('about', aboutSchema)