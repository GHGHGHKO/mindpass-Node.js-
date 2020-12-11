var mysql      = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var mysqldb;
mysqldb = {
    mysql_pool : mysql.createPool({
        host     : 'localhost',
        user     : 'GF34T54t4y',
        password : '$#trey43tY',
        database : 'bracelet',
        port : 13307
    })
};
module.exports = mysqldb;

