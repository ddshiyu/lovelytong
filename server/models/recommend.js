const mongoose = require('../plugins/db.js')
const autoIncrement = require('mongoose-auto-increment');
const recommendSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
  imageUrl: { type: String, default: 'http://www.baidu.com'},
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'category' },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})
recommendSchema.plugin(autoIncrement.plugin, {
	model: 'recommend',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('recommend', recommendSchema)