const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const commentSchema = new mongoose.Schema({
  article_id: { type: String },
  webUser: { type: mongoose.SchemaTypes.ObjectId, ref: 'webUser' },
  content: { type: String },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
commentSchema.plugin(autoIncrement.plugin, {
	model: 'comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('comment', commentSchema)