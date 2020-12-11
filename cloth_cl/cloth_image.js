var client = require("./mysql").mysql_pool;

exports.cloth_image = function(req,res,next){
  var id = req.body.id
  var cloth_id = req.body.cloth_id
  console.log('id ='+ id+ ' cloth_id = ' +cloth_id);
  client.query('select * from ' + id + ' where id = ?',[cloth_id],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{      //게시판 부르기성공
      res.set({'content-type': 'application/json; charset=utf-8'});
      res.json({image: result[0].image});
      console.log(result[0].image)
    }
  })
}
