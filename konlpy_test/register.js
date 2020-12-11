var client = require("./mysql").mysql_pool;
var md5 = require("md5")

exports.register= function(req,res,next){
  var id = req.body.id;
  var pw = req.body.pw;
  var pwCheck = req.body.pwCheck;
  var sex = req.body.sex;
  var age = req.body.age;
  var email = req.body.email;
  var store_Check = req.body.store_Check;
  var tel = req.body.tel;
  var store_Name = req.body.store_Name;
  var store_Num = req.body.store_Num;
  var date = new Date();
//  var date = d.getFullYear()+""+("0" + (d.getMonth() + 1)).slice(-2)+""+("0" + d.getDate()).slice(-2) +""+ ("0"+d.getHours()).slice(-2) +""+ ("0"+d.getMinutes()).slice(-2)+""+("0"+d.getSeconds()).slice(-2);
  console.log(id, pw, pwCheck, sex, age, email, store_Check, tel, store_Name, store_Num);
  if((id.length < 4) || (pw.length < 4)){
    res.json({code:412})      //길이부족
    console.log('register failed.(id or pw too short)')
  }else{
    if((store_Check == 1) && !(tel && store_Name && store_Num)){
      res.json({code:410})
      console.log('register failed.(Something Empty)')
    }else{
      if(!(id && pw && pwCheck && sex && age && email)){      //제목오류
        res.json({code:410})
        console.log('register failed.(Something Empty)')
      }else{      //내용오류
        if(pw != pwCheck){
          res.json({code:411});
          console.log('register failed.(check your pw)')
        }else{
          client.query('select * from user_info where id = ?',[id],function(error, row){
            if(error){
              res.json({code:500});
              console.log(error)
            }else if(row[0]){
              res.json({code:501});
              console.log('register faild.(dup id)')
            }else{
              client.query('insert into user_info (id, pw, sex, age, email, user_Create, pw_Update, store_Check , store_Name, store_Num, tel, auth) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,1)',[id, md5(pw), sex, age, email, date, date, store_Check, store_Name, store_Num, tel, 1],function(err, result){
                if(err){
                  res.json({code:500});
                  console.log(err)
                }else{
                  console.log('register success')    //쓰기성공
                  res.json({code:210})
                }
              })
            }
          })
        }
      }
    }
  }
}

