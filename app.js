var express = require('express');
var swig = require('swig');
require('./filters')(swig);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var models = require('./models/index');

var routes = require('./routes/index');
var users = require('./routes/users');
var add = require('./routes/add');
var wiki = require('./routes/wiki');
var search = require('./routes/search');
var tag = require('./routes/tag');
var register = require('./routes/register');
var login = require('./routes/login');


var marked = require('marked');

var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


passport.use('local', new LocalStrategy(
  function(username, password, done) {
    console.log("The details", username, password);
    console.log("LOG IN ATTEMPT");
    models.User.findOne({ username: username, password: password }, function(err, user) {
      console.log("USER", user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// app.use(passport.session());


// use the files in the views directory
app.use('/', routes);
app.use('/users', users);
app.use('/addpage', add);
app.use('/wiki', wiki);
app.use('/search', search);
app.use('/tag', tag);
app.use('/register', register);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  swig.setDefaults({cache: false});
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
