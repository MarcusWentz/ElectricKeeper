const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.PolygonMumbaiTestnetSubscribeAlchemyWSS //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0x807D55FD8D068E18D4E2B4FF1fC5506e52C133C1'
const contractABI_JS = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"State","type":"uint256"}],"name":"VoltageChange","type":"event"},{"inputs":[],"name":"BuyElectricity","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"LatestRenewalTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OwnerManualTurnOffElectricity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"VoltageState","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const timeMilliSec = 1000;
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;
const LED_RED = 17;
const LED_GREEN = 22;
const LED_YELLOW = 23;
const LED_BLUE = 27;

function checkValueLatest() { //get() contract value,
  contractDefined_JS.methods.VoltageState().call((err, balance) => {
  	console.log(balance)

	if(balance == 1){
	   	console.log("RED, BLUE RED AND GREEN LEDS ON!")
		piblaster.setPwm(LED_RED, pulseWidthMax);
		piblaster.setPwm(LED_GREEN, pulseWidthMax);
		piblaster.setPwm(LED_YELLOW, pulseWidthMax);
		piblaster.setPwm(LED_BLUE, pulseWidthMax);
	}
	else{
	   	console.log("RED, BLUE RED AND GREEN LEDS OFF!")
	  	piblaster.setPwm(LED_RED, pulseWidthMin);
		piblaster.setPwm(LED_GREEN, pulseWidthMin);
		piblaster.setPwm(LED_YELLOW, pulseWidthMin);
		piblaster.setPwm(LED_BLUE, pulseWidthMin);
	}
	setTimeout(() => {}, timeMilliSec);
  })
}

console.log("Contract starting value:")
checkValueLatest();

contractDefined_JS.events.VoltageChange({ //Subscribe to event.
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log("EVENT DETECTED! NEW STATE VALUE: ")
   checkValueLatest();  //Call the get function to get the most accurate present state for the value.
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
