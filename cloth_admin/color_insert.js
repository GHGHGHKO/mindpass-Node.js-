var client = require("./mysql.js").mysql_pool;

exports.insert = function(req,res){
  var color1 = req.body.color1;
  var color2 = req.body.color2;
  var color3 = req.body.color3;

  client.query('insert into color (color1, color2, color3) values (?, ?, ?)',[color1, color2, color3],function(err, result){
    if(err){
      res.json({code:500});
      console.log(err)
    }else{
      console.log('insert success')    //쓰기성공
      //res.json({code:210})
      res.redirect(req.get('referer'));
    }
  })
}

