let assert = require("assert");
let Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.mumbaiInfuraAPI)
);

const REQUESTOR_ADDRESS = "0x91459F3a89698e208b2e9A737b3C5790084A2EF6";
const devTestnetPrivateKey = Buffer.from(process.env.devTestnetPrivateKey, 'hex')


const CONTRACT_ADDRESS = "0x37160d3cB5834B090621AB2A86355493d808f45B";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"BuyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"ElectricRateTennessee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LED","outputs":[{"internalType":"uint256","name":"Voltage","type":"uint256"},{"internalType":"uint256","name":"ExpirationTimeUNIX","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"}],"name":"OwnerEmergencyDangerOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"}],"name":"OwnerEmergencySafeOn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"OwnerManualExpirationOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"expirationOccured","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"scaleMinutes","type":"uint256"}],"name":"feeInPenniesUSDinMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_electricRateTennessee","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestElectricRateTennessee","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]

const ElectricKeeperContractDeployed = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

const CHAINLINK_ADDRESS_MUMBAI = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
const CHAINLINK_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

const ChainlinkMaticDeployed = new web3.eth.Contract(CHAINLINK_ABI, CHAINLINK_ADDRESS_MUMBAI);

describe("Chainlink API tests", () => {
  it("ElectricRateTennessee > 0.", async () => {
    let ElectricRateTennessee = await ElectricKeeperContractDeployed.methods.ElectricRateTennessee().call();
    assert(ElectricRateTennessee > 0);
  });
  // it("After sending the contract 0.01 LINK and doing another API request and wait 30 seconds, ElectricRateTennessee > 0.", async () => {
  //   let ChainlinkBalance = await ChainlinkMaticDeployed.methods.balanceOf(REQUESTOR_ADDRESS).call();
  //   console.log("CHAINLINK BALANCE = " + ChainlinkBalance)
  //   //SEND CONTRACT 1*10**16 LINK
  //   await web3.eth.getTransactionCount(REQUESTOR_ADDRESS, (err, txCount) => {
  //   const txObject = {
  //     from: REQUESTOR_ADDRESS,
  //     to: CONTRACT_ADDRESS,
  //     nonce: web3.utils.toHex(txCount),
  //     gasLimit: web3.utils.toHex(300000),
  //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  //     data: ChainlinkMaticDeployed.methods.transfer(CONTRACT_ADDRESS,'10000000000000000').encodeABI(),
  //   }
  //   const tx = new Tx(txObject, common)
  //   tx.sign(devTestnetPrivateKey)
  //   const serializedTx = tx.serialize()
  //   const raw = '0x' + serializedTx.toString('hex')
  //   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  //     console.log('err:', err, 'txHash:', txHash)
  //   })
  // })
  // await web3.eth.getTransactionCount(REQUESTOR_ADDRESS, (err, txCount) => {
  // const txObject = {
  //   from: REQUESTOR_ADDRESS,
  //   to: CONTRACT_ADDRESS,
  //   nonce: web3.utils.toHex(txCount),
  //   gasLimit: web3.utils.toHex(300000),
  //   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  //   data: ElectricKeeperContractDeployed.methods.ElectricRateTennessee().encodeABI(),
  // }
  // const tx = new Tx(txObject, {chain:'mumbai', chainId: 8001})
  // tx.sign(devTestnetPrivateKey)
  // const serializedTx = tx.serialize()
  // const raw = '0x' + serializedTx.toString('hex')
  // web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  //   console.log('err:', err, 'txHash:', txHash)
  // })
  // })
  //   await new Promise(resolve => setTimeout(resolve,300000));
  //   let ElectricRateTennessee = await ElectricKeeperContractDeployed.methods.ElectricRateTennessee().call();
  //   assert(ElectricRateTennessee > 0);
  // });
});
