exports.generateKeys = generateKeys
exports.getAddressInfo = getAddressInfo
exports.subscribe = subscribe
exports.sendTransaction = sendTransaction
exports.resetNotifications = resetNotifications
exports.subscribeForOrganizationNotifications = subscribeForOrganizationNotifications

var fs = require('fs');
var chain = require('chain-node');
var bitcoin = require('bitcoinjs-lib');

var configObject = JSON.parse(fs.readFileSync('config.json'));

chain.apiKeyId = configObject["chain"].api_key;
chain.apiKeySecret = configObject["chain"].api_secret;

var transactionFee = configObject["chain"].transactionFee;

if(configObject["chain"].useTestnet)
	chain.blockChain = "testnet3";

function resetNotifications() {

	chain.listNotifications(function(err, resp) {

		if(resp == undefined)
			return;

		for ( var i = 0; i < resp.length; i++ ) {
			
			chain.deleteNotification(resp[i].id, function(err, resp) {
			  console.log("DELETED NOTIFICATION ");
			});

		}

	});

}

function getAddressInfo(address, callback) {

	chain.getAddress(address, callback);

}

function subscribe(publicAddress) {

	chain.createNotification({type: "address", block_chain: configObject["chain"].useTestnet ? "testnet3" : "bitcoin" , address: publicAddress, url: "https://bit-charity.herokuapp.com/notifications"}, function(err, resp) {});

}

function subscribeForOrganizationNotifications(publicAddress) {

	chain.createNotification({type: "address", block_chain: configObject["chain"].useTestnet ? "testnet3" : "bitcoin" , address: publicAddress, url: "https://bit-charity.herokuapp.com/organization/notifications"}, function(err, resp) {});

}

function generateKeys()
{

	var key = bitcoin.ECKey.makeRandom();

	return {
		private_key: key.toWIF(),
		public_key: configObject["chain"].useTestnet ? key.pub.getAddress(bitcoin.networks.testnet).toString() : key.pub.getAddress().toString()
	};

}

function sendTransaction(sender_privateKey, sender_publicKey, receiver_publicKey, amount, callback) {

	chain.getAddressUnspents(sender_publicKey, function(err, resp) {
		
		if(err != null) callback(err, null)
		
		var key = new bitcoin.ECKey.fromWIF(sender_privateKey);	
		
		var txn = new bitcoin.Transaction();

		var totalInputAmount = 0;

		var indexMax = 0;

		for(var i = 0; i < resp.length; i++)
		{

			indexMax++;

			totalInputAmount += resp[i].value;

			console.log(i + ": " + resp[i].value);

			txn.addInput(resp[i].transaction_hash, resp[i].output_index);

			if((totalInputAmount - transactionFee) >= amount)
				break;

		}

		if((totalInputAmount - transactionFee) < amount)
			callback({message: "Insufficient funds!"}, null);

		var returnAmount = totalInputAmount - amount;

		console.log("totalInputAmount: "+ totalInputAmount)

		console.log("returnAmount: "+ returnAmount)
		
		txn.addOutput(receiver_publicKey, totalInputAmount-returnAmount);

		txn.addOutput(sender_publicKey, returnAmount);

		for(var i = 0; i < indexMax; i++)
		{
			console.log(i);
			txn.sign(i, key);
		}

		chain.sendTransaction(txn.toHex(), function(err, resp) {
		  console.log('Error: ' + err);
		  console.log('Resp: ' + JSON.stringify(resp));
		  callback(null, resp);
		});

	})
}