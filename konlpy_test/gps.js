var client = require("./mysql").mysql_pool;

exports.gps = function(req,res,next){
  var id = req.body.id;
  var lat = req.body.lat;
  var lon = req.body.lon;
  console.log(lat, lon);

  client.query('update user_info set lat = ?, lon = ? where id = ?',[lat, lon, id],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{    //성공
      console.log('gps insert success')
      res.json({code:210})
    }
  })
}

