const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const experienceSchema = new mongoose.Schema({
  title: { type: String},
  desc: { type: String},
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
experienceSchema.plugin(autoIncrement.plugin, {
	model: 'experience',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('experience', experienceSchema)