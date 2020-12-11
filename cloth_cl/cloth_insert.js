var client = require("./mysql").mysql_pool;

exports.cloth_insert= function(req,res,next){
  var data = req.body;
  var id = req.body.id;
  var cloth = req.body.cloth;
  var color = req.body.color;
  console.log(id, cloth);
  if(!(req.body.id && req.body.cloth)){      //제목오류
    res.json({code:410})
    console.log('insert failed.(Something Empty)')
    console.log(data)
  }else{      //내용오류
    setTimeout(function() {// 아래쿼리문 image관련은 테스트중
      client.query('insert into ' +id+ ' (cloth, color, cloth_big, image) values (?, ?, ?,LOAD_FILE(\'/home/sm6336/ml/tmp/'+ id +'.jpg\'))',[cloth, color, req.body.cloth_big],function(err, result){
        if(err){
          res.json({code:501});
          console.log('server error')
        }else{
          console.log('insert success')    //쓰기성공
          res.json({code:210})
        }
      })
    },300)
  }
  if(data.cloth == '맨투맨' || data.cloth == '후드' || data.cloth == '셔츠' || data.cloth == '반팔' || data.cloth == '니트' || data.cloth == '목폴라' || data.cloth == '카라티' ){
    data.cloth_big = 'top'
  }
  if(data.cloth == '청바지' || data.cloth == '슬랙스' || data.cloth == '반바지' || data.cloth == '츄리닝' ){
    data.cloth_big = 'pants'
  }
  if(data.cloth == '로퍼'|| data.cloth == '러닝화' || data.cloth == '워커'  ){
    data.cloth_big = 'shoes'
  }
  if(data.cloth == '서류가방' || data.cloth == '백팩'){
    data.cloth_big = 'bag'
  }
  if(data.cloth == '바람막이' || data.cloth == '청자켓'|| data.cloth == '코트'|| data.cloth == '자켓'|| data.cloth == '롱패딩'|| data.cloth == '무스탕' || data.cloth == '숏패딩'|| data.cloth == '트랙탑' || data.cloth == '가디건'|| data.cloth == '후리스'|| data.cloth == '야상'  ){
    data.cloth_big = 'coat'
  }
}

