var client = require("./mysql").mysql_pool;

exports.heartbeat= function(req,res,next){
  var id = req.body.id;
  var nic = req.body.nic;
  var brcount = req.body.brcount;
  var d = new Date();
  var date = d.getFullYear()+"년"+("0" + (d.getMonth() + 1)).slice(-2)+"월"+("0" + d.getDate()).slice(-2) +"일"+ ("0"+d.getHours()).slice(-2) +":"+ ("0"+d.getMinutes()).slice(-2)+":"+("0"+d.getSeconds()).slice(-2);
  console.log(id, brcount, nic, date);
  res.json({brcount:brcount});
  /*
    if(!(id && nic && name && tel && pw && pwCheck)){      //제목오류
      res.json({code:410})
      console.log('register failed.(Something Empty)')
    }else{      //내용오류
      if(pw != pwCheck){
        res.json({code:411});
        console.log('register failed.(check your pw)')
      }else{
        client.query('insert into mbrdata (id, pw, tel, name, nic ,d_modify, d_regis) values (?, ?, ?, ?, ?, ?, ?)',[id, pw, tel, name, nic, d ,d ],function(err, result){
          if(err){
            client.query('select * from mbrdata where = ?',[id],function(error, row){
                if(row){
                  res.json({code:500});
                  console.log(err)
                }else{
                  res.json({code:501});
                  console.log('register faild.(dup id)')
                }
            })
          }else{
            console.log('register success')    //쓰기성공
            res.json({code:210})
          }
        })
      }
    }
  */
}

