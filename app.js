require('dotenv-flow').config(); // dotenv-flow has to be done as early as possible.


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')
const mongoose = require('mongoose');
// const uri = 'mongodb+srv://todo:todo321@cluster0-pmkr5.mongodb.net/todoDb?retryWrites=true&w=majority';
const uri = process.env.MONGODB_URI;
console.log("URI", uri);
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Asynchronous, will not block, it return a Promise
console.log("Step 1")

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("Step 3: Successfully connected to MongoDB: " + uri)
});

console.log("Step 2")


// function callback() {
//   console.log("Step 3: Successfully connected to MongoDB")
// }

// Arrow function, with value inside(), if not nothing inside()
// (x) => {
//   console.log("Step 3: Successfully connected to MongoDB")
// }

console.log("Step 4 --- DONE")



var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
