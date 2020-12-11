var client = require("./mysql").mysql_pool;

exports.memo_info= function(req,res,next){
  var id = req.body.id;
  var sex = req.body.sex;
  var age = req.body.age;
  var place = req.body.place;
  var memo = req.body.memo;
  var lat = req.body.lat;
  var lon = req.body.lon;
  var memo_time = new Date();
  //var date = d.getFullYear()+""+("0" + (d.getMonth() + 1)).slice(-2)+""+("0" + d.getDate()).slice(-2) +""+ ("0"+d.$
  console.log(id, sex, age, place, lat, lon, memo);
    if(!(age && sex && memo)){      //제목오류
      res.json({code:410})
      console.log('insert failed.(Something Empty)')
    }else{      //
      client.query('insert into memo_info (id, sex, age, place, lat, lon, memo) values (?, ?, ?, ?, ?, ?, ?)',[id, sex, age, place, lat, lon, memo],function(err, result){
        if(err){
          res.json({code:500});
          console.log(err)
        }else{
          console.log('insert success')    //쓰기성공
          res.json({code:210})
        }
      })
    }
}

