var admin = require("firebase-admin");
var serviceAccount = require("./keys/possible-stock-201112-firebase-adminsdk-sd894-c273a7dc88.json");
var client = require("./mysql").mysql_pool;

exports.push_message = function(req,res,next){
  if(!admin.apps.length){
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https:\/\/possible-stock-201112.firebaseio.com"
    });
  }
//  var registrationToken = "e5mzEJOyfSs:APA91bHRevR6O-uRgMZmdmNMzCih_c6puDVuSne3b0ZgGK9jkT7Sq1COwS49d0ZfLQtOW8d0s6dbMFo_BAxCOv3rpC1L6aTgawJ5bPreknCOG5z8gkJc3rGgrnUxq5cxILTbakiMhPTm" //클라이언트 토큰
  var ad = req.body.ad;
  var id = req.body.id;
  var sex = req.body.sex;
  var age = req.body.age;
  var store_Name = req.body.store_Name;
//  var registrationToken = req.body.token
  var lat = req.body.lat  //위도   36.7    0.01=1100m
  var lon = req.body.lon  //경도   127.4   0.01=900m
  console.log(id, lat, lon, ad);

  var max_lat = parseFloat(lat)+0.01
  var min_lat = parseFloat(lat)-0.01
  var max_lon = parseFloat(lon)+0.01
  var min_lon = parseFloat(lon)-0.01

  var payload = {
    notification:{
      title: "앗차차 광고알림",
      body: ad
    }
  }

  client.query('insert into ad_info (id, sex, age, store_Name, lat, lon, ad) values (?, ?, ?, ?, ?, ?, ?)',[id, sex, age, store_Name, lat, lon, ad],function(error, doc){
    if(error){
      res.json({code:500});
      console.log(error)
    }else{
      client.query('select * from user_info where (lat > ?) and (lat < ?) and (lon > ?) and (lon < ?)',[min_lat, max_lat, min_lon, max_lon],function(err, result){
        if(err){    //db연결오류
          res.json({code:500})
          console.log(err)
        }else{      //푸시 보내기
          console.log(result.length)
          for(var i = 0; i < result.length; i++){
            var registrationToken = result[i].registrationToken
            console.log(registrationToken)
            admin.messaging().sendToDevice(registrationToken, payload)
             .then(function(response){
                console.log("Successfully sent message:", response);
                res.json({code:210})
             })
             .catch(function(error){
                console.log("Error sending message:", error);
                res.json({code:411})
             })
          }
        }
      })
    }
  })
}
