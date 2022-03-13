let assert = require("assert");
let Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.mumbaiInfuraAPI)
);
const CONTRACT_ADDRESS = "0x37160d3cB5834B090621AB2A86355493d808f45B";
const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"VoltageChange","type":"event"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"},{"internalType":"uint256","name":"minutesToHaveOn","type":"uint256"}],"name":"BuyElectricityTimeOn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"ElectricRateTennessee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LED","outputs":[{"internalType":"uint256","name":"Voltage","type":"uint256"},{"internalType":"uint256","name":"ExpirationTimeUNIX","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"}],"name":"OwnerEmergencyDangerOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ledValue","type":"uint256"}],"name":"OwnerEmergencySafeOn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"OwnerManualExpirationOff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"expirationOccured","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"scaleMinutes","type":"uint256"}],"name":"feeInPenniesUSDinMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_electricRateTennessee","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestElectricRateTennessee","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"}]

const maticPriceFeedContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

async function display() {
  let value = await maticPriceFeedContract.methods.ElectricRateTennessee().call();
  console.log(value)
}

display()

async function displayAfterSendingLinkThenRequest() {
  //SEND CONTRACT 1*10**16 LINK

  //REQUEST UPDATED VALUE AFTER LINK SENT

  let value = await maticPriceFeedContract.methods.ElectricRateTennessee().call();
  console.log(value)
}

display()
displayAfterSendingLinkThenRequest()
// describe("Data feed contract for getting matic price data using chainlink oracles", () => {
//   it("Quantity of matic that $0.01 buys is greater than 0", async () => {
//     let maticPriceWei = await maticPriceFeedContract.methods
//       .ElectricRateTennessee()
//       .call();
//     assert(maticPriceWei > 0);
//   });
// });
