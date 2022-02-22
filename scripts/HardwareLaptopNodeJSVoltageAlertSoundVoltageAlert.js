const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.PolygonMumbaiTestnetSubscribeAlchemyWSS //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0x097C8609a052E99746D6C836f459dBbbA2DFB52F'
const contractABI_JS =
[{"anonymous":false,"inputs":[],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"BuyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TurnOffElectricity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"expirationOccured","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LED","outputs":[{"internalType":"uint256","name":"Voltage","type":"uint256"},{"internalType":"uint256","name":"ExpirationTimeUNIX","type":"uint256"},{"internalType":"address","name":"LatestBuyer","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
// var piblaster = require('pi-blaster.js');
var player = require('play-sound')(opts = {})
const timeMilliSec = 1000;
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;

let objectLED = {"pin":   [21   ,25    ,23      ,22     ,24      ,27      ,17    ,18     ],
                 "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','PINK','WHITE']}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function VoltageAlert() {
    player.play('VoltageAlert.mp3', function(err){if (err) throw err})
    await timeout(1500)
}

console.log("Contract starting value:")
VoltageAlert()


contractDefined_JS.events.VoltageChange({ //Subscribe to event.
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log("EVENT DETECTED! NEW STATE VALUE: ")
   VoltageAlert();  //Call the get function to get the most accurate present state for the value.
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
