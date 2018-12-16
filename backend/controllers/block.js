require('dotenv').config()
var express = require("express");
var router = express.Router();
var Web3 = require("web3");
var Tx = require('ethereumjs-tx');
var url = "https://ropsten.infura.io/v3/2e748b0c606f4830997f331d6bd52d34";
var web3 = new Web3(new Web3.providers.HttpProvider(url));

var gasPriceGwei = 8;
var gasLimit = 3500000;
var chainId = 3;

var contractAddress = "0x5872006bb49f4bb8a887e4f77a9be64fcdfbb9be";

var source = "0x0fe062a5a6c9c694c813792e843d8036bce72d5b";

var destination = "0xdad789a3d521950093f4d6426d81d0af86ff443d";

var PRIVATE_KEY = "11F83017129B3EB057EBBE929215F2982F388F9F8DCD69E26CF18039C730A535";

var count = web3.eth.getTransactionCount(source);

var acc = "0x0fe062a5a6c9c694c813792e843d8036bce72d5b";

var hash = "0x70ff1b999d402877dbf66089d5f4b847783b313eac21731107dad086f9647327";

var user= {
    auth:{
        key: "2e748b0c606f4830997f331d6bd52d34",
        secret: "ab50c051183449c0baf27b008472629e"
    }
}

var contractHash = '0xd6af12b95e20a0d459c50da7a77fa8c53e034eb0c739b977e28c4a8b29cce0e1';
var tranHash = ""

var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var contract = new web3.eth.Contract(abi,contractAddress);

contract.methods.balanceOf(source).call().then(function(result){
    var tokenBalance = result;
    console.log("Token balance is ",result);
    return tokenBalance
})

router.post("/trail",function(req,res){
    var balance = contract.methods.balanceOf(source).call().then(function(result){
        var tokenBalance = result;
        console.log("Token balance is ",result);
        res.render("trail",{balance:result})
        //return tokenBalance
    })
    //console.log("Balance ",balance);
    
    
})


// rawTx = {
//   "from": source,
//   "nonce": "0x" + count.toString(16),
//   "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
//   "gasLimit": web3.utils.toHex(gasLimit),
//   "to": contractAddress,
//   "value": "0x0",
//   "data": contract.methods.transfer(destination, 100).encodeABI(),
//   //"chainId": chainId 
// }

// rawTx = {
//   value: '0x0', 
//   from: source,
//   to: contractAddress,
//   data: contract.methods.transfer(destination, 1000).encodeABI(),  
// }


router.get('/',function(req,res){
	res.send("Hello Dashboard")
})

function sendSigned(txData, cb) {
    const privateKey = new Buffer(PRIVATE_KEY, 'hex')
    const transaction = new Tx(txData)
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString('hex')
    web3.eth.sendSignedTransaction('0x' + serializedTx, cb).on('transactionHash',function(txHash){
        console.log("Transaction hash is ",txHash)
    }).on('receipt',function(receipt){
        console.log("Receipt is ",receipt)
    }).on('error',function(error){
        console.log("Error is ",error)
    })
  }
  
  // get the number of transactions sent so far so we can create a fresh nonce
  web3.eth.getTransactionCount(source).then(txCount => {
  
    // construct the transaction data
    const txData = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(2500000),
      gasPrice: web3.utils.toHex(10e9), // 10 Gwei
      to: destination,
      from: source,
      data: contract.methods.transfer(destination, 1000).encodeABI(),
      value: web3.utils.toHex(web3.utils.toWei('12345', 'wei'))
    }
  
    // fire away!
    sendSigned(txData, function(err, result) {
      if (err) return console.log('error', err)
     // console.log('sent', tension)
    })

    //console.log(sendSigned)
})


// router.post('/transact',function(req,res){

// 	// var privKey = new Buffer(process.env["PRIVATE_KEY"], 'hex');

// 	// var tx = new Tx(rawTx);
// 	// tx.sign(privKey);
// 	// var serializedTx = tx.serialize();

// 	// var receipt = web3.eth.sendTransaction(rawTx).then(function(result){
// 	// 	console.log("result is ",result);
// 	// });

// 	// console.log("Receipt INfo ",receipt);

// 	// balance = contract.methods.balanceOf(source).call();

// 	// console.log("Balance is ",balance)

// 	// console.log("Result is ",receipt)

//     //res.render("transaction",{result:receipt})
    
//     function sendSigned(txData, cb) {
//         const privateKey = new Buffer(PRIVATE_KEY, 'hex')
//         const transaction = new Tx(txData)
//         transaction.sign(privateKey)
//         const serializedTx = transaction.serialize().toString('hex')
//         web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
//       }
      
//       // get the number of transactions sent so far so we can create a fresh nonce
//       web3.eth.getTransactionCount(addressFrom).then(txCount => {
      
//         // construct the transaction data
//         const txData = {
//           nonce: web3.utils.toHex(txCount),
//           gasLimit: web3.utils.toHex(25000),
//           gasPrice: web3.utils.toHex(10e9), // 10 Gwei
//           to: contractAddress,
//           from: source,
//           data: contract.methods.transfer(destination, 1000).encodeABI(),
//           value: web3.utils.toHex(web3.utils.toWei(123, 'wei'))
//         }
      
//         // fire away!
//         sendSigned(txData, function(err, result) {
//           if (err) return console.log('error', err)
//           console.log('sent', result)
//         })
// })
// })

router.get('/:hash',function(req,res){
    var tranDetails = web3.eth.getTransaction(hash,function(error,result){
        if(!error){
            console.log("response is ",result)
            res.render("transaction",{result:result});
        }else{
            console.error("error is ",error);
        }
    })
    
})


module.exports = router;