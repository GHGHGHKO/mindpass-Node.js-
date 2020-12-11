var client = require("./mysql.js").mysql_pool;

exports.update = function(req,res){
  var color1 = req.body.color1;
  var color2 = req.body.color2;
  var color3 = req.body.color3;
  var bbsid = parseInt(req.body.bbsid);
  //console.log(req.body);

  client.query('update color set color1 = ?, color2 = ?, color3 = ? where bbsid = ?',[color1, color2, color3, bbsid],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{      //게시판 부르기성공
      res.redirect('/color/1');
      console.log('update success')
    }
  })
}
