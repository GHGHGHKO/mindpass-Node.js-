var client = require("./mysql").mysql_pool;

exports.cloth_list = function(req,res,next){
  var id = req.body.id
  var cloth_big = req.body.cloth_big
  var page = (parseInt(req.body.page) - 1)*10;
  console.log(id, req.body.page);
  client.query('select id, color, cloth, cloth_big from '+ id + ' where cloth_big = ?', [cloth_big],function(err,resu){
    if(err){
      res.json({code:500})
      console.log(err)
    }else{
      client.query('select id, color, cloth, cloth_big from ' + id + ' where cloth_big = ? order by id desc limit ?, 10',[cloth_big, page],function(err, result){
        if(err){    //db연결오류
          res.json({code:500})
          console.log(err)
        }else{      //게시판 부르기성공
          res.set({'content-type': 'application/json; charset=utf-8'});
          res.json({total:resu.length,
                    cloth_big:cloth_big,
                    page:(parseInt(req.body.page)),
                    result: result?result:{}});
          console.log('load success')
        }
      })
    }
  })
}

