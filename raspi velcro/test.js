var http = require('http');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'db������',
  password : 'db���� �н�����',
  database : 'db��'
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

