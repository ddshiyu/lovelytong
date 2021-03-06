var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session')
var resourceMiddleware = require('./middleware/resource')
var app = express();


process.env.UV_THREADPOOL_SIZE = 128;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用跨域
app.use(require('cors')())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, '/dist')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(history());
app.use('/', express.static(path.join(__dirname, '/web')))
// app.use('/admin/api/:resource', resourceMiddleware(),indexRouter);
app.use('/users', usersRouter);
require('./routes/index.js')(app)
require('./routes/web.js')(app)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
