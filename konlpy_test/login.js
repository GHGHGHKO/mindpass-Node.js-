var secretObj = require("./jwt");
var md5 = require('md5');
var jwt = require("jsonwebtoken");
var client = require("./mysql").mysql_pool;

exports.login = function(req,res,next){
  var id = req.body.id;
  var pw = req.body.pw;
  var registrationToken = req.body.token
  console.log(id, pw, registrationToken);

  client.query('select * from user_info where id = ?',[id],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else if(result.length === 0){      //ID오류
      res.json({code:410})
      console.log('login failed.(ID)')
    }else{      //로그인성공
      if(result[0].pw === md5(pw)){
        client.query('update user_info set registrationToken = ? where id = ?',[registrationToken, id],function(error, doc){
          if(error){
            res.json({code:500})
            console.log(err)
          }else{
            console.log(result.length)
            res.set({'content-type': 'application/json; charset=utf-8'});
            res.json({id:id,
                sex:result[0].sex,
                age:result[0].age,
                email:result[0].email,
		store_Check:result[0].store_Check,
                store_Name:result[0].store_Name,
                token:registrationToken,
                code:210});
            console.log('login success')
          }
        })
      }else{    //pw오류
        console.log('login failed.(pw)')
        res.json({code:411})
      }
    }
  })
}

