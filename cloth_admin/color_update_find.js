var client = require("./mysql.js").mysql_pool;

exports.update_find = function(req,res){
//  var page = req.params.page;
  var page = 1
  var bbsid = parseInt(req.params.bbsid)
  console.log(bbsid)
  client.query('select * from color', function(err, rows){
    if(err){    //db연결오류
      res.json({code:500})
      console.log(err)
    }else{      //게시판 부르기성공
      client.query('select * from color where bbsid = ?', [bbsid], function(err, result){
        if(err){    //db연결오류
          res.json({code:500})
          console.log(err)
        }else{      //게시판 부르기성공
          res.render('../template_v2/elements_update_color.ejs', {title: ' 게시판 리스트', result: result, rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
          console.log({rows: rows, result: result})
          console.log('load success')
        }
      })
    }
  })
}
