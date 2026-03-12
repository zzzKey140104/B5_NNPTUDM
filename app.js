var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/roles', rolesRouter);
app.use('/api/v1/products', require('./routes/products'))
app.use('/api/v1/categories', require('./routes/categories'))

// build connection URI using environment variables
const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST
} = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_HOST) {
  console.error('Database environment variables missing. Please check .env file.');
  process.exit(1);
}

const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?appName=dbcloud&retryWrites=true&w=majority`;

// Mongoose 6+ enables the new parser and unified topology by default,
// so we can omit those options entirely.
mongoose.connect(mongoUri);


mongoose.connection.on('connected', function () {
  console.log("MongoDB Atlas connected");
});

mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', function () {
  console.log("MongoDB disconnected");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Return JSON error response for API
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
