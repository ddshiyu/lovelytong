const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const webUserSchema = new mongoose.Schema({
  access_id: { type: String },
  name: { type: String, default: '张三' },
  avatar: { type: String, default: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLMTybAlFfWFuQ9btJGraLzVGmrzhjRUsFl0X3jvFYY2vkrGufTF0cF9Bl04qGKa7bO4Ch0wevzAQ/132'},
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
webUserSchema.plugin(autoIncrement.plugin, {
	model: 'webUser',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('webUser', webUserSchema)