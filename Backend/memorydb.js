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
		name: "Organization 1",
		description: "Organization description, we're awesome !",
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