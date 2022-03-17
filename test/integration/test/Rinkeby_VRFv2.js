const { expect } = require('chai');
const LightShowABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"have","type":"address"},{"internalType":"address","name":"want","type":"address"}],"name":"OnlyCoordinatorCanFulfill","type":"error"},{"anonymous":false,"inputs":[],"name":"lightShowUpdate","type":"event"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"twoRandomWords","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));

  describe('Rinkeby VRFv2 Light Show Integration Test', async function () {
    it('VRFv2 Light Show Returns Random Numbers', async () => {
      const accounts = await ethers.getSigners()
      const signer = accounts[0]
      const lightShowContract = new ethers.Contract('0xD111A5E51034A17505f82547Ad3508EbCFc7c405', LightShowABI, signer)
      var requestTransaction = await lightShowContract.requestRandomWords()
      console.log('hash:' + requestTransaction.hash)
      await new Promise(resolve => setTimeout(resolve, 300000))
      var firstRandomWord = await lightShowContract.twoRandomWords(0)
      console.log("firstRandomWord: ", new ethers.BigNumber.from(firstRandomWord._hex).toString())
      expect(new ethers.BigNumber.from(firstRandomWord._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
      var secondRandomWord = await lightShowContract.twoRandomWords(1)
      console.log("secondRandomWord: ", new ethers.BigNumber.from(secondRandomWord._hex).toString())
      expect(new ethers.BigNumber.from(secondRandomWord._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
    })
  })
