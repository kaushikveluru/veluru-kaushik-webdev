var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer')
var uuid = require('node-uuid')
var passport = require('passport')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose');



var connection_string = '127.0.0.1:27017/test';

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect('mongodb://'+connection_string);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//app.use(multer());
app.use(cookieParser());
var secret = process.env.SESSION_SECRET || "abcd"
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret
}))

app.use(passport.initialize());
app.use(passport.session())





require ("./test/app.js")(app);
require("./assignment/app.js")(app);
require("./public/project/server/app.js")(app,db,mongoose);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ipaddress,function(){
    console.log('runnning')
});
