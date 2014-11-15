exports.generateKeys = generateKeys
exports.getAddressInfo = getAddressInfo
exports.sendTransaction = sendTransaction

var fs = require('fs');
var chain = require('chain-node');
var bitcoin = require('bitcoinjs-lib');

var configObject = JSON.parse(fs.readFileSync('config.json'));

chain.apiKeyId = configObject["chain"].api_key;
chain.apiKeySecret = configObject["chain"].api_secret;

if(configObject.useTestnet)
	chain.blockChain = "testnet3";

function getAddressInfo(address, callback) {

	chain.getAddress(address, callback);

}

function generateKeys()
{

	var key = bitcoin.ECKey.makeRandom();

	return {
		private_key: key.toWIF(),
		public_key: configObject.useTestnet ? key.pub.getAddress(bitcoin.networks.testnet).toString() : key.pub.getAddress().toString()
	};

}

function sendTransaction(sender_privateKey, sender_publicKey, receiver_publicKey, amount, callback) {

	chain.getAddressUnspents(senderAddress, function(err, resp) {
		
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