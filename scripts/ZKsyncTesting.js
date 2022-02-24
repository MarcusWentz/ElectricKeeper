const { Wallet } = require('zksync');
const { ethers } = require('ethers');
let zksync = require('zksync')

async function connectZKsyncRinkeby(){
  const syncProvider = await zksync.getDefaultProvider('rinkeby');
  console.log(syncProvider)
  const ethersProvider = ethers.getDefaultProvider('rinkeby');
  console.log(ethersProvider)
  const signer = new ethers.Wallet(process.env.devTestnetPrivateKey, ethersProvider);
  console.log(signer)
}

connectZKsyncRinkeby()
