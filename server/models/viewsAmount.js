const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const viewAmountSchema = new mongoose.Schema({
  ip: { type: String },
  location: { type: String },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},{ timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }})
viewAmountSchema.plugin(autoIncrement.plugin, {
	model: 'viewAmount',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('viewAmount', viewAmountSchema)