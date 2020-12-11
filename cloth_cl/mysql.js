var mysql      = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var mysqldb;
mysqldb = {
    mysql_pool : mysql.createPool({
        host     : 'localhost',
        user     : '@$%Rtw234t',
        password : 'wSDF$#GF',
        database : 'test',
        port : 13307
    })
};
module.exports = mysqldb;

