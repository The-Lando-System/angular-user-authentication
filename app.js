/************************** 
 * app.js - Setup and initialize the Express server
 *
 ********/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongoskin');

var routes = require('./app/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// Set the DB based on environment
var db;
if (app.get('env') === 'production') {
    db = mongo.db(process.env.DB_URL,{native_parser:true});
} else {
    db = mongo.db("mongodb://localhost:27017/user-auth-test",{native_parser:true});
}
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;