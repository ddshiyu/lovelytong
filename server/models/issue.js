const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const issueSchema = new mongoose.Schema({
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
issueSchema.plugin(autoIncrement.plugin, {
	model: 'issue',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('issue', issueSchema)