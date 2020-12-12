var http = require('http');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'db계정명',
  password : 'db계정 패스워드',
  database : 'db명'
});

connection.connect(function(err){
        if(!err)
        {
            console.log("Database is connected ... \n\n");
        }
        else
        {
            console.log("Error connecting database ... \n\n");
        }
});

