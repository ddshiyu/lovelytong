const mongoose = require('../plugins/db.js')
const autoIncrement = require('mongoose-auto-increment');
const tagSchema = new mongoose.Schema({
  title: { type: String },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
tagSchema.plugin(autoIncrement.plugin, {
	model: 'Article',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
 module.exports = mongoose.model('tag', tagSchema)