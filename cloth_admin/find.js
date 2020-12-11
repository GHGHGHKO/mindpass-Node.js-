var client = require("./mysql.js").mysql_pool;

exports.find = function(req,res){
  var page = req.params.page;
  console.log(page)
  if(req.cookie){
    res.redirect('/')
  }else{
    client.query('select * from clothes/* order by bbsid limit ?, 10*/'/*, [page]*/, function(err, rows){
      if(err){    //db연결오류
        res.json({code:500})
        console.log(err)
      }else{      //게시판 부르기성공
        res.render('../template_v2/elements.ejs', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log({title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
      }
    })
  }
}

