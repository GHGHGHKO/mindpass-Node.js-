var http = require('http');
var wpi = require('wiring-pi');
var sleep = require('sleep');

var HOST = '222.116.135.199';
var PATH = '/home/csserver/nodejs/json.js';
var PORT = '6427';
var METHOD = 'POST';

var options = {
  host: HOST,
  path: PATH,
  port: PORT,
  method: METHOD
};

var LED4        = 4;
var READ_PIN5   = 5;
var LED2	= 2;
var READ_PIN3	= 3;

wpi.setup('wpi');
wpi.pinMode(LED4, wpi.OUTPUT);
wpi.pinMode(READ_PIN5, wpi.INPUT);
wpi.pinMode(LED2, wpi.OUTPUT);
wpi.pinMode(READ_PIN3, wpi.INPUT);

function readJSONResponse(response) {
  var responseData = '';
  response.on('data', function (chunk) {
    responseData += chunk;
  });
  response.on('end', function () {
    var dataObj = JSON.parse(responseData);
//    console.log("Message: " + dataObj.message);
//    console.log("Question: " + dataObj.question);
  });
}
var req = http.request(options, readJSONResponse);

if(wpi.digitalRead(READ_PIN5) == wpi.HIGH && wpi.digitalRead(READ_PIN3) == wpi.HIGH)
{
	wpi.digitalWrite(LED4, wpi.HIGH);
	wpi.digitalWrite(LED2, wpi.HIGH);
	req.write('{"name_2":"1", "occupation_2":"1"}');
}
else if(wpi.digitalRead(READ_PIN5) == wpi.LOW && wpi.digitalRead(READ_PIN3) == wpi.HIGH)
{
        wpi.digitalWrite(LED4, wpi.LOW);
        wpi.digitalWrite(LED2, wpi.HIGH);
        req.write('{"name_2":"0", "occupation_2":"1"}');
}
else if(wpi.digitalRead(READ_PIN5) == wpi.HIGH && wpi.digitalRead(READ_PIN3) == wpi.LOW)
{
        wpi.digitalWrite(LED4, wpi.HIGH);
        wpi.digitalWrite(LED2, wpi.LOW);
        req.write('{"name_2":"1", "occupation_2":"0"}');
}
else
{
        wpi.digitalWrite(LED4, wpi.LOW);
        wpi.digitalWrite(LED2, wpi.LOW);
        req.write('{"name_2":"0", "occupation_2":"0"}');
}
//req.write('{"name":"1", "occupation":"0"}');
req.end();
