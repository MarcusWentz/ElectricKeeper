const { Wallet } = require('zksync');
const { ethers } = require('ethers');
let zksync = require('zksync')

async function depositRinkebyETHtoZKsync() {
  const syncProvider = await zksync.getDefaultProvider('rinkeby');
  // console.log(syncProvider)
  const ethersProvider = ethers.getDefaultProvider('rinkeby');
  // console.log(ethersProvider)
  const ethWallet = new ethers.Wallet(process.env.devTestnetPrivateKey, ethersProvider);
  // console.log(ethWallet)
  const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);
  // console.log(syncWallet)

  //Deposit
  const deposit = await syncWallet.depositToSyncFromEthereum({
    depositTo: syncWallet.address(),
    token: 'ETH',
    amount: ethers.utils.parseEther('0.200')
  });
  const depositReceipt = await deposit.awaitReceipt();
  const depositReceiptVerify = await deposit.awaitVerifyReceipt();

  //NEED TO UNLOCK ACCOUNT FIRST
  if (!(await syncWallet.isSigningKeySet())) {
    if ((await syncWallet.getAccountId()) == undefined) {
      throw new Error('Unknown account');
    }
  const changePubkey = await syncWallet.setSigningKey({
    feeToken: 'ETH',
    ethAuthType: 'ECDSA'
  });
  await changePubkey.awaitReceipt();
}

  const committedETHBalance = await syncWallet.getBalance('ETH');
  console.log(committedETHBalance)

  const withdraw = await syncWallet.withdrawFromSyncToEthereum({
    ethAddress: ethWallet.address,
    token: 'ETH',
    amount: ethers.utils.parseEther('0.198')
  });

  await withdraw.awaitVerifyReceipt();

  // const committedETHBalance = await syncWallet.getBalance('ETH');
  // console.log(committedETHBalance)
}

depositRinkebyETHtoZKsync()
