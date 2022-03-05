//const { expect } = require('chai');
//var chai = require('chai');
//const BN = require('bn.js');
//chai.use(require('chai-bn')(BN));
//const { ethers } = require("hardhat");
let assert = require("assert");
let Web3 = require("web3");
const web3 = new Web3(
  //new Web3.providers.HttpProvider(process.env.RPC_PROVIDER)
  new Web3.providers.HttpProvider("RPC_PROVIDER_API_KEY")
);
const CONTRACT_ADDRESS = "0xDBA94e656c9f5A05FEe286f6A31C90c587B82ebf";
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

describe("Light Show contract consumer that requests two randomly generated words from a Chainlink VRFv2 subscriber", () => {
  	it("Both randomly generated numbers are greater than zero and have been successfully returned", async () => {
    	await VRFv2LightShowContract.methods.requestRandomWords().call();
		await new Promise(resolve => setTimeout(resolve, 3000000))
		let firstRandomWord = await VRFv2LightShowContract.methods.twoRandomWords(0).call();
		let secondRandomWord = await VRFv2LightShowContract.methods.twoRandomWords(1).call();
		console.log("First Random Number: " + firstRandomWord)
		console.log("Second Random Number: " + secondRandomWord)
    	assert(firstRandomWord > 0 && secondRandomWord > 0)
  	});
});
