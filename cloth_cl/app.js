var fs = require('fs')
var https = require('https')
var express = require('express');;
var router = express.Router();
var login = require("./login");
//var list = require("./list");
//var insert = require("./insert");
var register = require("./register");
//var crawling = require("./crawling");
//var weather = require("./weather");
var mlcloth = require("./mlcloth")
var cloth_insert = require("./cloth_insert")
var cloth_delete = require("./cloth_delete")
var cloth_list = require("./cloth_list")
var like_insert = require("./like_insert")
var cloth_image = require("./cloth_image")
//var pw_update = require("./pw_update")
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloth_filter = require('./cloth_filter')
var multer = require('multer');
var util = require("util");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/home/sm6336/ml/tmp/')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname)
  }
})

var upload = multer({storage: storage});
var type = upload.any()

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
/*
app.listen(3001, function(){
  console.log('server is running');
})
*/
https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/mp-domain-test.kro.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mp-domain-test.kro.kr/fullchain.pem'),
}, app).listen(7777, () => {
  console.log('Listening...')
})

app.post("/login", login.login)
//app.post("/survey", survey.survey)
//app.get("/list/:bbsid/:page", list.list)
//app.delete("/deleteID/:email", deleteID.deleteID)
//app.post("/insert", insert.insert)
app.post("/register", register.register)
//app.get("/crawling/:email", crawling.crawling)
//app.get("/weather/:lat/:long", weather.weather)
app.post("/mlcloth",type,mlcloth.mlcloth)
app.post("/like_insert",like_insert.like_insert)
app.post("/cloth_insert",cloth_insert.cloth_insert)
app.post("/cloth_delete",cloth_delete.cloth_delete)
app.post("/cloth_list",cloth_list.cloth_list)
app.post("/cloth_image", cloth_image.cloth_image)
app.post("/cloth_filter",cloth_filter.cloth_filter)
//app.put("/info_update", info_update.info_update)
//app.put("/pw_update", pw_update.pw_update)
//app.get("/youtube/:email", youtube.youtube)
//app.get("/knowledge/:email", knowledge.knowledge)

