var fs = require('fs')
var express = require('express');
var https = require('https');
var http = require('http');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('./test_login.js');
//var insert = require('./insert.js');
//var update = require("./update.js")
//var update_find = require("./update_find")
//var find = require("./find.js")
//var delete_info = require("./delete_info.js")

var key = fs.readFileSync(__dirname + '/keys/key.pem');
var cert = fs.readFileSync(__dirname + '/keys/cert.pem');
var options = {
  key: key,
  cert: cert
};

var app = express();

var server = https.createServer(options, app);

server.listen(7777, () => {
  console.log("server starting on port : 7777")
});

//app.use('/clothes/:page',express.static(__dirname + '/template_v2'));
//app.use('/modify_info/:bbsid',express.static(__dirname + '/template_v2'))
//app.use('/',express.static(__dirname + '/template_v2'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//https.createServer(options, app).listen(7777, function(){
//  console.log('server is running');
//})

app.post("/login", login.login)
