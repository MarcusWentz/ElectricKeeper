//Source material: https://www.dappuniversity.com/articles/web3-js-intro
//Need to import web3 Linux:
//sudo npm install web3
//HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w

//Connect to Web3.
const Web3 = require('web3')
//Use WSS to get live event data instead of polling constantly,
const rpcURL = "wss://ws-matic-mumbai.chainstacklabs.com" // Your RPC URL goes here
//Connect to Web3 with Infura WSS.
const web3 = new Web3(rpcURL)
//Define contract
const contractAddress_JS = '0x6B63D45981A5c444004358D6feeaccB6aD8f584A'
const contractABI_JS = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"State","type":"uint256"}],"name":"VoltageChange","type":"event"},{"inputs":[],"name":"BuyElectricity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"LatestRenewalTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OwnerManualTurnOffElectricity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"VoltageState","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
// var piblaster = require('pi-blaster.js');
const timeMilliSec = 1000;
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;
const LED_RED = 17;
const LED_GREEN = 22;
const LED_YELLOW = 23;
const LED_BLUE = 27;

//get() contract value,
function checkValueLatest() {
  contractDefined_JS.methods.VoltageState().call((err, balance) => {
  	console.log(balance)

	if(balance == 1){
	   	console.log("RED, BLUE RED AND GREEN LEDS ON!")
		// piblaster.setPwm(LED_RED, pulseWidthMax);
		// piblaster.setPwm(LED_GREEN, pulseWidthMax);
		// piblaster.setPwm(LED_YELLOW, pulseWidthMax);
		// piblaster.setPwm(LED_BLUE, pulseWidthMax);
	}
	else{
	   	console.log("RED, BLUE RED AND GREEN LEDS OFF!")
	  //  	piblaster.setPwm(LED_RED, pulseWidthMin);
		// piblaster.setPwm(LED_GREEN, pulseWidthMin);
		// piblaster.setPwm(LED_YELLOW, pulseWidthMin);
		// piblaster.setPwm(LED_BLUE, pulseWidthMin);
	}
	setTimeout(() => {}, timeMilliSec);
  })
}

console.log("Contract starting value:")
checkValueLatest();

//Subscribe to event.
contractDefined_JS.events.VoltageChange({
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
    //console.log(eventResult)
   //Call the get function to get the most accurate present state for the value.
   console.log("EVENT DETECTED! NEW STATE VALUE: ")
   checkValueLatest();
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
