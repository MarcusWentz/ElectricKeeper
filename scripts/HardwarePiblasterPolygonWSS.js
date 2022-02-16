const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.PolygonMumbaiTestnetSubscribeAlchemyWSS //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0xB92376659C471f10239099E28f657F69415aF5D2'
const contractABI_JS =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"BuyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LED","outputs":[{"internalType":"uint256","name":"Voltage","type":"uint256"},{"internalType":"uint256","name":"ExpirationTimeUNIX","type":"uint256"},{"internalType":"address","name":"LatestBuyer","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TurnOffElectricity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"expirationOccured","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const timeMilliSec = 1000;
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;

let objectLED = {"pin":   [17   ,27    ,23      ,22     ,24      ,25      ,18    ,21     ],
                 "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','GREY','WHITE']}

function checkValueLatest() { //get() contract value,

  for(let ledValue = 0; ledValue < 8; ledValue++ ) {
    contractDefined_JS.methods.LED(ledValue).call((err, balance) => {
      if(balance.Voltage == 1){
        console.log("COLOR " + objectLED['color'][ledValue] + " PIN " + objectLED['pin'][ledValue] + " ON!" )
        piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMax);
      }
      if(balance.Voltage == 0){
        console.log("COLOR " + objectLED['color'][ledValue]  + " PIN " +  objectLED['pin'][ledValue] + " OFF!" )
        piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMin);
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
