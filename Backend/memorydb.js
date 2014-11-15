exports.getOrganizations = getOrganizations
exports.getOrganization = getOrganization
exports.createOrganization = createOrganization

var shortId = require('shortid');
var bitcoin = require('./bitcoin.js');
var chain = require('chain-node');
var fs = require('fs');

organizations = []

function createOrganization (organization) {

	if(organization.id == undefined)
		organization.id = shortId.generate();

	organization.wallet = bitcoin.generateKeys();
	organization.payment_status = {
		max: 0,
		total: 0,
		count: 0
	};

	organization.background = "";

	organization.qr_code = "https://api.qrserver.com/v1/create-qr-code/?data=" + organization.wallet.public_key + "&size=250x250";

	bitcoin.subscribe(organization.wallet.public_key);

	organizations.push(organization)

}

function createQRCode(public_key, callback) {


	imgur.setClientID(myClientID);
	imgur.upload(path.join(__dirname, 'someimage.png'),function(err, res){
	    console.log(res.data.link); //log the imgur url
	});

}

function getOrganizations() {

	return organizations;

}

function getOrganization (id) {

	for(var i = 0; i < organizations.length; i++)
	{
		if(organizations[i].id == id)
			return organizations[i];
	}

	return undefined;
}

createOrganization({
		name: "Ebola Charity",
		description: "Help us fight ebola today!",
		contact_info: 
		{
			website: "http://www.google.com/",
			phone: "+1 (571) 263 - 4240",
			address: "3685 Moorhead Ave. Bouder, CO 80305"
		},
		public_key: "mpRm4M8JRH6cukTDVueKEcE5bR2WyqvKNS",
		payment_status: {
			max: 5,
			total: 90,
			count: 4
		}

	});

console.log(getOrganizations())