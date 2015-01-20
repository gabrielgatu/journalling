var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var app = express();

// Compile the sass files 
app.use(
    sassMiddleware({
        src: __dirname + '/app/assets/stylesheets',
        dest: __dirname + '/app/assets/stylesheets/css',
        debug: true,
        outputStyle: 'compressed'
}));

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/assets/stylesheets/css')));
app.use(express.static(path.join(__dirname, 'app/assets/images')));
app.use(express.static(path.join(__dirname, 'app/assets/javascripts')));
app.use(express.static(path.join(__dirname, 'public')));

// Configuring passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({ 
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./config/passport/init');
initPassport(passport);

//====================== ROUTES ======================//

require('./config/routes')(app, passport)

//====================== ERROR HANDLERS ======================//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    mongoose.connect('mongodb://127.0.0.1/journalling');
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