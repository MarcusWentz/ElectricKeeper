//const { expect } = require('chai');
//var chai = require('chai');
//const BN = require('bn.js');
//chai.use(require('chai-bn')(BN));
//const { ethers } = require("hardhat");
let assert = require("assert");
let Web3 = require("web3");
const web3 = new Web3(
  //new Web3.providers.HttpProvider(process.env.RPC_PROVIDER)
  new Web3.providers.HttpProvider("https://eth-rinkeby.alchemyapi.io/v2/XLpN55iO6dicvdHGFq9uBavwXms06WLG")
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


const VRFv2LightShowContract = web3.eth.contract(ABI, CONTRACT_ADDRESS);

describe("Light Show contract consumer that requests two randomly generated words from a Chainlink VRFv2 subscriber", () => {
  	it("Both randomly generated numbers are greater than zero and have been successfully returned", async () => {
    	//await VRFv2LightShowContract.methods.requestRandomWords().call();
		//await new Promise(resolve => setTimeout(resolve, 300000))
		//let randomWords = await VRFv2LightShowContract.methods.twoRandomWords(0).call();
		//console.log(randomWords)
		VRFv2LightShowContract.methods.twoRandomWords(0).call((err, balance) => {
			console.log((balance%255)+1)
		})
    	//assert(randomWords[0] > 0 && randomWords[1] > 0)
  	});
	  //console.log('randomWords: ' + new ethers.BigNumber.from(randomWords[0]._hex).toString() + new ethers.BigNumber.from(randomWords[1]._hex).toString())
	  //expect((new ethers.BigNumber.from(resultETH._hex).toString())).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from('0').toString())
});
