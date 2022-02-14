const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.PolygonMumbaiTestnetSubscribeAlchemyWSS //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0x01FBD75A3bF18bc72FB188c9C18030F93D0d4Bd7'
const contractABI_JS =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"BuyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LED","outputs":[{"internalType":"uint256","name":"Voltage","type":"uint256"},{"internalType":"uint256","name":"ExpirationTimeUNIX","type":"uint256"},{"internalType":"address","name":"LatestBuyer","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OwnerManualTurnOffElectricity","outputs":[],"stateMutability":"nonpayable","type":"function"}]
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

function checkValueLatest() { //get() contract value,

  for(let ledValue = 0; ledValue < 4; ledValue++ ) {
    contractDefined_JS.methods.LED(ledValue).call((err, balance) => {
      if(ledValue == 0 && balance.Voltage == 1){
        console.log("RED ON!")
        // piblaster.setPwm(LED_RED, pulseWidthMax);
      }
      if(ledValue == 0 && balance.Voltage == 0){
        console.log("RED OFF!")
        // piblaster.setPwm(LED_RED, pulseWidthMin);
      }
      if(ledValue == 1 && balance.Voltage == 1){
        console.log("BLUE ON!")
        // piblaster.setPwm(LED_BLUE, pulseWidthMax);
      }
      if(ledValue == 1 && balance.Voltage == 0){
        console.log("BLUE OFF!")
        // piblaster.setPwm(LED_BLUE, pulseWidthMin);
      }
      if(ledValue == 2 && balance.Voltage == 1){
        console.log("YELLOW ON!")
        // piblaster.setPwm(LED_YELLOW, pulseWidthMax);
      }
      if(ledValue == 2 && balance.Voltage == 0){
        console.log("YELLOW OFF!")
        // piblaster.setPwm(LED_YELLOW, pulseWidthMin);
      }
      if(ledValue == 3 && balance.Voltage == 1){
          console.log("GREEN ON!")
        // piblaster.setPwm(LED_GREEN, pulseWidthMax);
      }
      if(ledValue == 3 && balance.Voltage == 0){
        console.log("GREEN OFF!")
        // piblaster.setPwm(LED_GREEN, pulseWidthMin);
      }
    })
  }

  setTimeout(() => {}, timeMilliSec);

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
