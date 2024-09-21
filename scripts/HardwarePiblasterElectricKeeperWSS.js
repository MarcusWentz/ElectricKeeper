const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.baseSepoliaWSS //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0x1Dd241b92b7656f6Bc34433966cFCa1f37c444D9'
const contractABI_JS = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EmptyArgs","type":"error"},{"inputs":[],"name":"EmptySource","type":"error"},{"inputs":[],"name":"EtherNotSent","type":"error"},{"inputs":[],"name":"InvalidLedValue","type":"error"},{"inputs":[],"name":"MsgValueTooSmall","type":"error"},{"inputs":[],"name":"NoExpirationYet","type":"error"},{"inputs":[],"name":"NoInlineSecrets","type":"error"},{"inputs":[],"name":"OnlyRouterCanFulfill","type":"error"},{"inputs":[],"name":"OracleValueZero","type":"error"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"name":"UnexpectedRequestID","type":"error"},{"inputs":[],"name":"VoltageNotInEmergencyOffState","type":"error"},{"inputs":[],"name":"VoltageNotOn","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"response","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"err","type":"bytes"}],"name":"Response","type":"event"},{"anonymous":false,"inputs":[],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LED","outputs":[{"internalType":"uint256","name":"Voltage","type":"uint256"},{"internalType":"uint256","name":"ExpirationTimeUNIX","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"buyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"electricRateTennesseePennies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"expirationOccured","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"scaleMinutes","type":"uint256"}],"name":"feeInEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestEthUsdPennies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"name":"handleOracleFulfillment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"}],"name":"ownerEmergencyDangerOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"}],"name":"ownerEmergencySafeOn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ownerManualExpirationOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"s_lastError","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastRequestId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastResponse","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"string[]","name":"args","type":"string[]"}],"name":"sendRequest","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const timeMilliSec = 1000;
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;

let objectLED = {"pin":   [21   ,25    ,23      ,22     ,24      ,27      ,17    ,18     ],
                 "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','PINK','WHITE']}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function checkValueLatest() { //get() contract value,

  for(let ledValue = 0; ledValue < 8; ledValue++ ) {
    contractDefined_JS.methods.LED(ledValue).call((err, balance) => {
      if(balance.Voltage == 1){
        console.log("COLOR " + objectLED['color'][ledValue] + " PIN " + objectLED['pin'][ledValue] + " ON!" )
        piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMax);
      } else {
        console.log("COLOR " + objectLED['color'][ledValue]  + " PIN " +  objectLED['pin'][ledValue] + " OFF!" )
        piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMin);
      }
    })
  }
  await timeout(timeMilliSec)
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
