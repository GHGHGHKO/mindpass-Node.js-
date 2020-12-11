var fs = require('fs');
var mysql      = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var mysqldb;
mysqldb = {
    mysql_pool : mysql.createPool({
        host     : 'localhost',
        user     : '@$RFerty5',
        password : 'WREF3%yefg3y',
        database : 'konlpy',
        port : 13307,
	ssl: {
		ca: fs.readFileSync(__dirname + '/keys/ca.pem'),
		key: fs.readFileSync(__dirname + '/keys/client-key.pem'),
		cert: fs.readFileSync(__dirname + '/keys/client-cert.pem')
	}
    })
};
module.exports = mysqldb;

