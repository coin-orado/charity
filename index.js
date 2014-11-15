exports.StartServer = StartServer

var express = require('express');
var bodyParser = require('body-parser');
var bitcoin = require('./Backend/bitcoin.js');
var memorydb = require('./Backend/memorydb.js');
var LINQ = require('node-linq').LINQ;

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

	response.send( bitcoin.generateKeys() );

})

app.post('/notifications', function(request, response) {
	
	var address = request.body.payload.address;
	var received = request.body.payload.received;
	var sent = request.body.payload.sent;

	var organizations = memorydb.getOrganizations();

	var linq = new LINQ(organizations).Single(function(x){ return x.wallet.public_key==address });

	if(linq == undefined) {
		response.send( "Thanks !" );
		return;
	}

	var donated = received - sent;
	
	linq.payment_status.count += 1;
	if(linq.payment_status.max > donated)
		linq.payment_status.max = donated;
	linq.payment_status.total += donated;

	response.send("Really appreciate it !");

	bitcoin.sendTransaction(linq.wallet.private_key, linq.wallet.public_key, linq.public_key, donated, function(){});

})

app.get("/organization/:id", function (request, response)
{
	// TODO: USE ID !!!
	var object = memorydb.getOrganizations()[0];
	delete object.wallet

	response.send(object)
});

app.get("/organization", function(request, response) {

	var linq = new LINQ(memorydb.getOrganizations()).Select(function(x){ delete x.wallet; return x;  }).ToArray();
	response.send(linq);
})

app.post("/organization", function (request, response) {

	var object = request.body;
	memorydb.createOrganization(object);
	delete object.wallet
	response.send(object);
});