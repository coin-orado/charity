exports.StartServer = StartServer

var express = require('express');
var bodyParser = require('body-parser');
var bitcoin = require('./Backend/bitcoin.js');
var memorydb = require('./Backend/memorydb.js');

var app = express();

function StartServer() {

	app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname + '/'))
	app.use(bodyParser.json())

	app.listen(app.get('port'), function() {
	  console.log("Charity server is running at localhost:" + app.get('port'))
	})

}

StartServer()

app.get("/wallet", function(request, response) {
	response.send(bitcoin.generateKeys());
})

app.post('/notifications', function(request, response) {
	console.log(request.body);
	response.send("OK !");
})

app.get("/organization/:id", function (request, response) 
{
	// TODO: USE ID !!!
	var object = memorydb.getOrganizations()[0];
	delete object.wallet

	response.send(object)
});