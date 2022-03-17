const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
const rpcURL =  process.env.rinkebyWebSocketSecureEventsInfuraAPIKey //Use WSS to get live event data instead of polling constantly,
const web3 = new Web3(rpcURL)
const contractAddress_JS = '0xD111A5E51034A17505f82547Ad3508EbCFc7c405'
const contractABI_JS =
[{"inputs":[{"internalType":"address","name":"have","type":"address"},{"internalType":"address","name":"want","type":"address"}],"name":"OnlyCoordinatorCanFulfill","type":"error"},{"anonymous":false,"inputs":[],"name":"lightShowUpdate","type":"event"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"twoRandomWords","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const timeMilliSec = 1000; //2 seconds per value
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;

let objectLED = {"pin":   [21   ,25    ,23      ,22     ,24      ,27      ,17    ,18     ],
                 "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','PINK','WHITE']}

let ArrayStorage = [];

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function updateLights() {
 while(true){
   if(ArrayStorage.length == 0){
     for(let randomNumbers = 0; randomNumbers < 2; randomNumbers++ ) {
       console.log("API CALL")
       contractDefined_JS.methods.twoRandomWords(randomNumbers).call((err, balance) => {
          ArrayStorage.push((balance%255)+1)
        })
        await timeout(timeMilliSec)
      }
    }
    if(ArrayStorage.length > 0){
      for(let randomNumbers = 0; randomNumbers < 2; randomNumbers++ ) {
            for(let i = 0 ; i < 2 ; i++) {
              console.log(ArrayStorage[i])
              for(let ledValue = 0; ledValue < 8; ledValue++ ) {
                  if(  (ArrayStorage[i]&(2**(ledValue))) == (2**(ledValue)) ){
                    console.log("COLOR " + objectLED['color'][ledValue] + " PIN " + objectLED['pin'][ledValue] + " ON!" )
                    piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMax);
                  } else {
                    console.log("COLOR " + objectLED['color'][ledValue]  + " PIN " +  objectLED['pin'][ledValue] + " OFF!" )
                    piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMin);
                  }
              }
              await timeout(timeMilliSec)
            }
      }
    }
  }
}

console.log("Contract starting value:")
updateLights()

contractDefined_JS.events.lightShowUpdate({ //Subscribe to event.
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log("EVENT DETECTED! NEW STATE VALUE: ")
   ArrayStorage = []; //WIPE LAST VALUES THEN UPDATE AGAIN.
   updateLights();  //Call the get function to get the most accurate present state for the value.
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
