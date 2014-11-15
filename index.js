exports.StartServer = StartServer

var express = require('express');
var bodyParser = require('body-parser');
var bitcoin = require('./Backend/bitcoin.js')

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

app.get("/wallet", function(request, response){
	response.send(bitcoin.generateKeys());
})

app.get("/organization/:id", function (request, response) 
{
	var dummyOrganizationObject = 
	{
		name: "Organization 1",
		description: "Organization description, we're awesome !",
		contact_info: 
		{
			website: "http://www.google.com/",
			phone: "+1 (571) 263 - 4240",
			address: "3685 Moorhead Ave. Bouder, CO 80305"
		},
		public_key: "blahblahblahfornow :)",
		payment_status: {
			max: 5,
			total: 90,
			count: 4
		}
	}

	response.send(dummyOrganizationObject)
});

