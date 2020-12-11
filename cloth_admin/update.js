var client = require("./mysql.js").mysql_pool;

exports.update = function(req,res){
  var top = req.body.top;
  var pants = req.body.pants;
  var shoes = req.body.shoes;
  var bag = req.body.bag;
  var coat = req.body.coat;
  var bbsid = parseInt(req.body.bbsid);
  //console.log(req.body);

  client.query('update clothes set top = ?, pants = ?, shoes = ?, bag = ?, coat = ? where bbsid = ?',[top, pants, shoes, bag, coat, bbsid],function(err, result){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{      //게시판 부르기성공
      res.redirect('/clothes/1');
      console.log('update success')
    }
  })
}
