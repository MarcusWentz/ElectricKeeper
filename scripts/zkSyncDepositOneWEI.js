const { Wallet } = require('zksync');
const { ethers } = require('ethers');
let zksync = require('zksync')

async function depositOneWEIRinkebyzkSync() {
  const syncProvider = await zksync.getDefaultProvider('rinkeby');
  const ethersProvider = ethers.getDefaultProvider('rinkeby');
  const ethWallet = new ethers.Wallet(process.env.devTestnetPrivateKey, ethersProvider);
  const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

  const deposit = await syncWallet.depositToSyncFromEthereum({
    depositTo: syncWallet.address(),
    token: 'ETH',
    amount: 1 //1 WEI
  });
  const depositReceipt = await deposit.awaitReceipt();
  const depositReceiptVerify = await deposit.awaitVerifyReceipt();

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

  const committedETHBalance1 = await syncWallet.getBalance('ETH');
  console.log(committedETHBalance1)

  // const withdraw = await syncWallet.withdrawFromSyncToEthereum({
  //   ethAddress: ethWallet.address,
  //   token: 'ETH',
  //   amount: ethers.utils.parseWei('1')
  // });
  //
  // await withdraw.awaitVerifyReceipt();
  //
  // const committedETHBalance2 = await syncWallet.getBalance('ETH');
  // console.log(committedETHBalance2)
}

depositOneWEIRinkebyzkSync()
