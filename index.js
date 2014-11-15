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
	
	var outputs_array = request.body.payload.transaction.outputs;
	var outputs = []

	for(var i = 0; i < outputs_array.length; i++) {

		var outs = outputs_array[i].addresses;
		console.log(outs);
		for(var j = 0; j < outs.length; j++) {
			outputs.push(outs[j]);
		}

	}

	var linq = new LINQ(outputs);

	var organizations = memorydb.getOrganizations();
	for(var i = 0; i < organizations.length; i++) {
		if(linq.Contains(organizations[i].wallet.public_key))
		{
			// FOUND A DONATION TO THIS WALLET, FORWARD IT TO


		}
	}

	response.send( outputs );
	
})

app.get("/organization/:id", function (request, response) 
{
	// TODO: USE ID !!!
	var object = memorydb.getOrganizations()[0];
	delete object.wallet

	response.send(object)
});

app.get("/organization", function(request, response){

	var linq = new LINQ(memorydb.getOrganizations()).Select(function(x){ delete x.wallet; return x;  }).ToArray();
	response.send(linq);
})

app.post("/organization", function (request, response) {

	var object = request.body;
	memorydb.createOrganization(object);
	response.send(object);
});