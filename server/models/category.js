const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const categorySchema = new mongoose.Schema({
  title: { type: String },
  priority: { type: Number },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }}) // 优先级

categorySchema.plugin(autoIncrement.plugin, {
	model: 'category',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('category', categorySchema)