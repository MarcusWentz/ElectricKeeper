const { expect } = require('chai');
const LinkTokenABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]'

var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));

  describe('Mumbai ElectricKeeper Integration Test', async function () {

    let apiConsumer

    beforeEach(async () => {
      const APIConsumer = await ethers.getContractFactory('ElectricKeeper');
      apiConsumer = await APIConsumer.deploy();
      await apiConsumer.deployed();
    })
    it('API and Prciefeed Return > 0', async () => {
      const accounts = await ethers.getSigners()
      const signer = accounts[0]
      const linkTokenContract = new ethers.Contract('0x326C977E6efc84E512bB9C30f76E30c160eD06FB', LinkTokenABI, signer)
      var transferTransaction = await linkTokenContract.transfer(apiConsumer.address,'10000000000000000')
      await transferTransaction.wait()
      console.log('hash:' + transferTransaction.hash)
      const transaction = await apiConsumer.requestElectricRateTennessee()
      const tx_receipt = await transaction.wait()
      const requestId = tx_receipt.events[0].topics[1]
      await new Promise(resolve => setTimeout(resolve, 30000))
      const resultElectricRateTennessee = await apiConsumer.ElectricRateTennessee()
      console.log("ElectricRateTennessee: ", new ethers.BigNumber.from(resultElectricRateTennessee._hex).toString())
      expect(new ethers.BigNumber.from(resultElectricRateTennessee._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
      const resultFeeInPennies = await apiConsumer.feeInPenniesUSDinMatic(1)
      console.log("feeInPenniesUSDinMatic: ", new ethers.BigNumber.from(resultFeeInPennies._hex).toString())
      expect(new ethers.BigNumber.from(resultFeeInPennies._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
    })
  })
