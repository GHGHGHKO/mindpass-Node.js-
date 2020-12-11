var client = require("./mysql").mysql_pool;

exports.delete_info = function(req,res,next){
  var bbsid = parseInt(req.params.bbsid);
  console.log(req.params.bbsid)

  client.query('delete from color where bbsid = ?',[bbsid],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{      //게시판 부르기성공
      res.redirect('/color/1');
      console.log('delete success')
    }
  })
}
