var fs = require('fs')
var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('./login.js');
var insert = require('./insert.js');
var delete_info = require("./delete_info.js")
var update = require("./update.js")
var update_find = require("./update_find")
var find = require("./find.js")
var color_insert = require('./color_insert.js');
var color_delete_info = require("./color_delete_info.js")
var color_update = require("./color_update.js")
var color_update_find = require("./color_update_find")
var color_find = require("./color_find.js")

var app = express();

app.use('/clothes/:page',express.static(__dirname + '/template_v2'));
app.use('/modify_info/:bbsid',express.static(__dirname + '/template_v2'))
app.use('/',express.static(__dirname + '/template_v2'));
app.use('/color/:page',express.static(__dirname + '/template_v2'));
app.use('/color_modify_info/:bbsid',express.static(__dirname + '/template_v2'))
app.use('/',express.static(__dirname + '/template_v2'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(3000, function(){
  console.log('server is running');
})

app.get('/', function(req, res) {
  res.writeHead(200,{'Content-Type':'text/html'});
  fs.readFile("./template_v2/page-login.html", function(err, data){
    if(err) throw err;
    res.end(data, 'utf-8')
  });
});

app.get("/clothes/:page", find.find)
app.post("/login", login.login)
app.post("/clothes_insert", insert.insert)
app.get("/delete_info/:bbsid",delete_info.delete_info)
app.get("/modify_info/:bbsid", update_find.update_find)
app.post("/update",update.update)
app.get("/color/:page", color_find.find)
app.post("/color_clothes_insert", color_insert.insert)
app.get("/color_delete_info/:bbsid",color_delete_info.delete_info)
app.get("/color_modify_info/:bbsid", color_update_find.update_find)
app.post("/color_update",color_update.update)

