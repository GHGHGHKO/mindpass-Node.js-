var util = require("util");

exports.mlkonlpy = function (req, res, next) {
  var memo = req.body.konlpy_memo;
  console.log(memo)
  var spawn = require("child_process").spawn;
  var process = spawn('python3',["/home/sm6336/konlpy_test/test.py",memo]);
  process.stdout.on('data', function(data){
    var result2 = JSON.stringify(data.toString());
    var result = JSON.parse(result2);
    var test=JSON.parse(data.toString());
    var json = '{"code": 410, "result": [], "total": 0}';
    var fail = JSON.parse(json);
//    res.json(test);
//    console.log(test)

//    if(test.total != 0){
      res.json(test);
      console.log(test)
/*    }else{
      test.code = 410;
      console.log(test)
      res.json(test)
    }
*/
  })
}
