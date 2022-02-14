const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.PolygonMumbaiTestnetSubscribeAlchemyWSS //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0x0863A17F1E99f1c4e413782a509743D1FBb25F4b'
const contractABI_JS =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[4]","name":"State","type":"uint256[4]"}],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"BuyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ExpirationTimeUNIX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OwnerManualTurnOffElectricity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"VoltageStates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
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

  for(let ledSlot = 0; ledSlot < 4; ledSlot++ ) {
    contractDefined_JS.methods.VoltageStates(ledSlot).call((err, balance) => {
      // console.log("STATE: " + balance)

      if(ledSlot == 0 && balance == 1){
        console.log("RED ON!")
        // piblaster.setPwm(LED_RED, pulseWidthMax);
      }
      if(ledSlot == 0 && balance == 0){
        console.log("RED OFF!")
        // piblaster.setPwm(LED_RED, pulseWidthMin);
      }
      if(ledSlot == 1 && balance == 1){
        console.log("BLUE ON!")
        // piblaster.setPwm(LED_BLUE, pulseWidthMax);
      }
      if(ledSlot == 1 && balance == 0){
        console.log("BLUE OFF!")
        // piblaster.setPwm(LED_BLUE, pulseWidthMin);
      }
      if(ledSlot == 2 && balance == 1){
        console.log("YELLOW ON!")
        // piblaster.setPwm(LED_YELLOW, pulseWidthMax);
      }
      if(ledSlot == 2 && balance == 0){
        console.log("YELLOW OFF!")
        // piblaster.setPwm(LED_YELLOW, pulseWidthMin);
      }
      if(ledSlot == 3 && balance == 1){
          console.log("GREEN ON!")
        // piblaster.setPwm(LED_GREEN, pulseWidthMax);
      }
      if(ledSlot == 3 && balance == 0){
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
