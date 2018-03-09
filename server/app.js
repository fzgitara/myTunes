const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const FB = require('fb');

const index = require('./routes/index');
const myTunes = require('./routes/myTunes');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myTunes');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("db connect to mongo");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/myTunes', myTunes);


//FB Graph test
// app.get('/test', (req, res) => {
//   console.log('masuk test')
//   FB.setAccessToken('EAADgOecnlf0BACzjqZBAK3DMytLudyef9Ub3EchJzCLnLyfXe4Y2W0ZCmnWuu06ppvOUZCZB9Mz95ExzV7ZBaWHUhZBP9HPIExoLxuFXd1Tl8DzYHPnGEBRVO9V14HLWiD7WwjXTZAUCZAMf58pguiwN5McOyGzncq4UqNtZCdjWUjbzUuM2qIJt2SAiSezZCTaXQ0a4X3lHbdzwZDZD"');
//   FB.api('/me', function (res) {
//       if(!res || res.error) {
//        console.log(!res ? 'error occurred' : res.error);
//        return;
//       }
//       console.log(res);
//   });
//   res.send('wow')
// })

// app.post('/test', (req, res) => {
//   console.log(req.body)
  // FB.setAccessToken(req.body.tokenFB);
  // FB.api('/me',{fields: ['name', 'gender','email', 'music']}, function(response) {
  //     console.log(response)
  // });
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
