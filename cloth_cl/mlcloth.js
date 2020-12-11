var multer = require('multer');
var util = require("util");

exports.mlcloth = function (req, res, next) {
  console.log(req.files[0])
  var filename = req.files[0].fieldname;
  var path = req.files[0].path;
  var spawn = require("child_process").spawn;
  var process = spawn('python3',["/home/sm6336/ml/retrain_run_inference.py",filename]);
  process.stdout.on('data', function(data){
    var result2 = JSON.stringify(data.toString());
    var result = JSON.parse(result2);
    var test=JSON.parse(data.toString());
    console.log(test);
    res.json(test);
  })
  console.log(filename);
}

