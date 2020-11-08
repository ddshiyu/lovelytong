const mongoose = require('../plugins/db')
const autoIncrement = require('mongoose-auto-increment');
const userInfoSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user'},
  roles: { type: Array, default: ['admin']},
  name: {type: String, default: 'jiandong'},
  avatar: { type: String, default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'},
  instruction: { type: String, default: '这是一个blog'}
})
userInfoSchema.plugin(autoIncrement.plugin, {
	model: 'userInfo',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('userInfo', userInfoSchema)