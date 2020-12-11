var client = require("./mysql").mysql_pool;

exports.cloth_delete = function(req,res,next){
  var id = req.body.id;
  var cloth_id = req.body.cloth_id;
  console.log(id, cloth_id);
  client.query('delete from '+ id +' where id = ?',[cloth_id],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{      //게시판 부르기성공
      res.json({code:210});
      console.log('delete success')
    }
  })
}
