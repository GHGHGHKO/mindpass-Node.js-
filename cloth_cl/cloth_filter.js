var client = require("./mysql").mysql_pool;
var util = require("util");

exports.cloth_filter = /*async*/ function (req, res, next) {
  var id = req.body.id;
/*  var cp = require('child_process')
  const p = cp.spawn('python3',["/home/sm6336/ml/compare_clothes_color_with_mysql.py",id], {
    cwd: process.cwd(),
    maxBuffer: 1000 * 1000 * 100 // 100 MB
  });*/
  var spawn = require("child_process").spawn;
  var process = spawn('python3',["/home/sm6336/ml/compare_clothes_color_with_mysql.py",id] );
  /*await*/ process.stdout.on('data', function(data){
    //var result2 = JSON.stringify(data.toString());
    //var result = JSON.parse(result2);
    var test = JSON.parse(data.toString());
    console.log(test);
    res.json(test);
  })
}

