var client = require("./mysql.js").mysql_pool;

exports.insert = function(req,res){
  var top = req.body.top;
  var pants = req.body.pants;
  var shoes = req.body.shoes;
  var bag = req.body.bag;
  var coat = req.body.coat;

  client.query('insert into clothes (top, pants, shoes, bag, coat) values (?, ?, ?, ?, ?)',[top, pants, shoes, bag, coat],function(err, result){
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

