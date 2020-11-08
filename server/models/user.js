const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
  }
})
userSchema.plugin(autoIncrement.plugin, {
	model: 'user',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = mongoose.model('user', userSchema)