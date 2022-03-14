var Tx = require("ethereumjs-tx").Transaction
let assert = require("assert");
let Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC_PROVIDER)
);
const CONTRACT_ADDRESS = "0xDBA94e656c9f5A05FEe286f6A31C90c587B82ebf";
const REQUESTOR_ADDRESS = "0x91459F3a89698e208b2e9A737b3C5790084A2EF6";
const devTestnetPrivateKey = Buffer.from(process.env.devTestnetPrivateKey, 'hex')
const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "want",
				"type": "address"
			}
		],
		"name": "OnlyCoordinatorCanFulfill",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "lightShowUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "randomWords",
				"type": "uint256[]"
			}
		],
		"name": "rawFulfillRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "twoRandomWords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const VRFv2LightShowContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

describe("Light Show contract consumer that requests two randomly generated words from a Chainlink VRFv2 subscriber", function() {
  	it("Both randomly generated numbers are greater than zero and have been successfully returned", async function() {
		this.timeout(1000000);
		let firstRandomWord = 0;
		let secondRandomWord = 0;
		await web3.eth.getTransactionCount(REQUESTOR_ADDRESS, (err, txCount) => {
			const txObject = {
				nonce: web3.utils.toHex(txCount),
				to: CONTRACT_ADDRESS,
				from: REQUESTOR_ADDRESS,
				gasLimit: web3.utils.toHex(300000), 
        			gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
				data: VRFv2LightShowContract.methods.requestRandomWords().encodeABI(),
			}	
			const tx = new Tx(txObject, {chain:'rinkeby'})
			tx.sign(devTestnetPrivateKey)
			const serializedTx = tx.serialize()
			const raw = '0x' + serializedTx.toString('hex')
			web3.eth.sendSignedTransaction(raw, (err, txHash) => {
				console.log('err:', err, 'txHash:', txHash)
			})
		})
		await new Promise(resolve => setTimeout(resolve,300000));
		console.log("Light Show Updated!");
		firstRandomWord = await VRFv2LightShowContract.methods.twoRandomWords(0).call();
		secondRandomWord = await VRFv2LightShowContract.methods.twoRandomWords(1).call();
		console.log("First Random Number: " + firstRandomWord)
		console.log("Second Random Number: " + secondRandomWord)
		assert(firstRandomWord > 0 && secondRandomWord > 0)
  	});
});
