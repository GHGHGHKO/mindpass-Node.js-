var fs = require('fs')
var https = require('https')
var express = require('express');;
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mlkonlpy = require("./ml_konlpy.js");
var memo_info = require("./memo_info.js")
var register = require("./register.js")
var login = require("./login.js")
var gps = require("./gps.js")
var push_message = require("./push_message.js")

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/mp-domain-test.kro.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mp-domain-test.kro.kr/fullchain.pem'),
}, app).listen(3000, () => {
  console.log('Listening...')
})

app.post("/login", login.login)
app.post("/register", register.register)
app.post("/mlkonlpy", mlkonlpy.mlkonlpy)
app.post("/memoInsert", memo_info.memo_info)
app.post("/gps", gps.gps)
app.post("/push_message", push_message.push_message)
