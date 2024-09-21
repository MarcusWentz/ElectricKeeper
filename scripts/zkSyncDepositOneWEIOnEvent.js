// const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
// const rpcURL =  process.env.PolygonMumbaiTestnetSubscribeAlchemyWSS //Use WSS to get live event data instead of polling constantly,
// const web3 = new Web3(rpcURL)
// const contractAddress_JS = '0x37160d3cB5834B090621AB2A86355493d808f45B'
// const contractABI_JS = [{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:false,inputs:[{indexed:true,internalType:"bytes32",name:"id",type:"bytes32"},],name:"ChainlinkCancelled",type:"event",},{anonymous:false,inputs:[{indexed:true,internalType:"bytes32",name:"id",type:"bytes32"},],name:"ChainlinkFulfilled",type:"event",},{anonymous:false,inputs:[{indexed:true,internalType:"bytes32",name:"id",type:"bytes32"},],name:"ChainlinkRequested",type:"event",},{anonymous:false,inputs:[],name:"VoltageChange",type:"event"},{inputs:[{internalType:"uint256",name:"ledValue",type:"uint256"},{internalType:"uint256",name:"minutesToHaveOn",type:"uint256"},],name:"BuyElectricityTimeOn",outputs:[],stateMutability:"payable",type:"function",},{inputs:[],name:"ElectricRateTennessee",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"LED",outputs:[{internalType:"uint256",name:"Voltage",type:"uint256"},{internalType:"uint256",name:"ExpirationTimeUNIX",type:"uint256"},],stateMutability:"view",type:"function",},{inputs:[],name:"Owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint256",name:"ledValue",type:"uint256"}],name:"OwnerEmergencyDangerOff",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[{internalType:"uint256",name:"ledValue",type:"uint256"}],name:"OwnerEmergencySafeOn",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"OwnerManualExpirationOff",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[{internalType:"bytes",name:"",type:"bytes"}],name:"checkUpkeep",outputs:[{internalType:"bool",name:"upkeepNeeded",type:"bool"},{internalType:"bytes",name:"",type:"bytes"},],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"expirationOccured",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint256",name:"scaleMinutes",type:"uint256"},],name:"feeInPenniesUSDinMatic",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function",},{inputs:[{internalType:"bytes32",name:"_requestId",type:"bytes32"},{internalType:"uint256",name:"_electricRateTennessee",type:"uint256",},],name:"fulfill",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[{internalType:"bytes",name:"",type:"bytes"}],name:"performUpkeep",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"requestElectricRateTennessee",outputs:[{internalType:"bytes32",name:"requestId",type:"bytes32"}],stateMutability:"nonpayable",type:"function",},];
// const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

// //
// //
// // const Web3 = require('web3') //HIDE KEYS WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w "vim .bashrc" > "i" > update > "esc" > ":w" enter
// // const rpcURL =  process.env.rinkebyWebSocketSecureEventsInfuraAPIKey //Use WSS to get live event data instead of polling constantly,
// // const web3 = new Web3(rpcURL)
// // const contractAddress_JS = '0xD111A5E51034A17505f82547Ad3508EbCFc7c405'
// // const contractABI_JS =
// // [{"inputs":[{"internalType":"address","name":"have","type":"address"},{"internalType":"address","name":"want","type":"address"}],"name":"OnlyCoordinatorCanFulfill","type":"error"},{"anonymous":false,"inputs":[],"name":"lightShowUpdate","type":"event"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"twoRandomWords","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
// // const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

// const { Wallet } = require('zksync');
// const { ethers } = require('ethers');
// let zksync = require('zksync')

// var player = require('play-sound')(opts = {})

// async function depositOneWEIRinkebyzkSync() {
//   player.play('VoltageAlertDetected.mp3', function(err){if (err) throw err})
//   const syncProvider = await zksync.getDefaultProvider('rinkeby');
//   const ethersProvider = ethers.getDefaultProvider('rinkeby');
//   const ethWallet = new ethers.Wallet(process.env.devTestnetPrivateKey, ethersProvider);
//   const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

//   const deposit = await syncWallet.depositToSyncFromEthereum({
//     depositTo: syncWallet.address(),
//     token: 'ETH',
//     amount: 1 //1 WEI
//   });
//   const depositReceipt = await deposit.awaitReceipt();
//   const depositReceiptVerify = await deposit.awaitVerifyReceipt();

//   if (!(await syncWallet.isSigningKeySet())) {
//     if ((await syncWallet.getAccountId()) == undefined) {
//       throw new Error('Unknown account');
//     }
//   const changePubkey = await syncWallet.setSigningKey({
//     feeToken: 'ETH',
//     ethAuthType: 'ECDSA'
//   });
//   await changePubkey.awaitReceipt();
// }

//   const committedETHBalance1 = await syncWallet.getBalance('ETH');
//   console.log(committedETHBalance1)

//   // const withdraw = await syncWallet.withdrawFromSyncToEthereum({
//   //   ethAddress: ethWallet.address,
//   //   token: 'ETH',
//   //   amount: ethers.utils.parseWei('1')
//   // });
//   //
//   // await withdraw.awaitVerifyReceipt();
//   //
//   // const committedETHBalance2 = await syncWallet.getBalance('ETH');
//   // console.log(committedETHBalance2)
// }

// // contractDefined_JS.events.lightShowUpdate({ //Subscribe to event.
// //      fromBlock: 'latest'
// //  }, function(error, eventResult){})
// //  .on('data', function(eventResult){
// //    console.log("EVENT DETECTED! NEW STATE VALUE: ")
// //    depositOneWEIRinkebyzkSync()
// //    })
// //  .on('changed', function(eventResult){
// //      // remove event from local database
// //  })
// //  .on('error', console.error);


//  contractDefined_JS.events.VoltageChange({ //Subscribe to event.
//       fromBlock: 'latest'
//   }, function(error, eventResult){})
//   .on('data', function(eventResult){
//     console.log("EVENT DETECTED! NEW STATE VALUE: ")
//     depositOneWEIRinkebyzkSync()
//     })
//   .on('changed', function(eventResult){
//       // remove event from local database
//   })
//   .on('error', console.error);
