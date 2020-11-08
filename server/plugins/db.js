const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
mongoose.connection.once('open', () => {
  console.log('链接成功')
})
autoIncrement.initialize(mongoose.connection);
module.exports = mongoose