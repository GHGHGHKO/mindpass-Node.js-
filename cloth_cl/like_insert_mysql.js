var mongo = require("./mongo");
var client = require("./mysql").mysql_pool;
var util = require('util')

exports.like_insert = function(req,res,next){
  var id = req.body.id;
  var data = req.body.data;
  console.log(id, data)
  client.query('insert into user_like (id, data) values (?, ?)',[id, data],function(err, result){
    if(err){
      res.json({code:501});
      console.log('server error')
    }else{
      console.log('insert success')    //쓰기성공
      res.json({code:210})
    }
  })
}
