exports.StartServer = StartServer

var express = require('express');
var bodyParser = require('body-parser');
var bitcoin = require('./Backend/bitcoin.js');
var memorydb = require('./Backend/memorydb.js');
var LINQ = require('node-linq').LINQ;

var app = express();

function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

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

// Receive notifications for organization wallet
app.post('/organization/notifications', function(request, response) {

	var address = request.body.payload.address;
	var received = request.body.payload.received;
	var sent = request.body.payload.sent;

	if(sent <= received){
		response.send("thanks");
		return;
	}

	var organizations = memorydb.getOrganizations();

	var linq = new LINQ(organizations).Single(function(x){return x.public_key==address});

	if(linq == undefined) {
		response.send("Thanks but I don't need it.")
		return;
	}

	var paidToAddress = request.body.payload.output_addresses;
	var indexOfInput = paidToAddress.indexOf(address);

	if(indexOfInput > -1)
		paidToAddress.splice(indexOfInput, 1);

	memorydb.addExpense(linq.id, paidToAddress[0], (sent-received));

});

app.get('/expenses/:id', function(request,response) {

	var expenses = memorydb.getExpenses();

	var linq = new LINQ(expenses).Where( function (x) {
		return x.id == request.param("id");
	});

	response.send(linq);

});

app.post('/notifications', function(request, response) {
	
	var address = request.body.payload.address;
	var received = request.body.payload.received;
	var sent = request.body.payload.sent;
	var donated = received - sent;

	if(donated <= 0) {
		response.send("Thanks !");
		return;
	}

	var organizations = memorydb.getOrganizations();

	var linq = new LINQ(organizations).Single(function(x){ return x.wallet.public_key==address });

	if(linq == undefined) {
		response.send( "Thanks !" );
		return;
	}
	
	linq.payment_status.count += 1;
	if(linq.payment_status.max < donated)
		linq.payment_status.max = donated;
	linq.payment_status.total += donated;

	response.send("Really appreciate it !");

	bitcoin.sendTransaction(linq.wallet.private_key, linq.wallet.public_key, linq.public_key, donated, function(){});

});

app.get("/organization/:id", function (request, response)
{
	var object = clone(memorydb.getOrganization(request.param("id")));
	object.public_key = object.wallet.public_key;
	delete object.wallet

	response.send(object)
});

app.get("/organization", function(request, response) {

	var linq = new LINQ(memorydb.getOrganizations()).Select(function(x) {
		var model = clone(x);
	 	model.public_key = model.wallet.public_key;
	 	delete model.wallet; 
	 	return model;
	}).ToArray();
	response.send(linq);
})

app.post("/organization", function (request, response) {

	var object = request.body;
	memorydb.createOrganization(object);
	var model = clone(object);
	delete model.wallet
	response.send(model);
});