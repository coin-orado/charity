exports.getOrganizations = getOrganizations
exports.getOrganization = getOrganization
exports.createOrganization = createOrganization
exports.getNameForPublicKey = getNameForPublicKey
exports.addExpense = addExpense
exports.getExpenses = getExpenses

var shortId = require('shortid');
var bitcoin = require('./bitcoin.js');
var chain = require('chain-node');
var fs = require('fs');

organizations = [ ]
organizationsExpenses = [ ]
tags = { }

tags["public_key1"] = "Starbucks";
tags["public_key2"] = "Cheesecake Factory";

function addExpense(orgId, publicAddr) {

	organizationsExpenses.push({
		id: orgId,
		paid_to: publicAddr,
		paid_to_name: getNameForPublicKey(publicAddr)
	});

}

function getExpenses() {

	return organizationsExpenses;
	
}

function getNameForPublicKey(addr) {

	var name = tags[addr];
	if (name == undefined)
		return "";

	return name;

}

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