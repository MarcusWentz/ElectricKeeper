let zksync = require('zksync')

async function connectZKsyncRinkeby(){
  const syncProvider = await zksync.getDefaultProvider('rinkeby');
  console.log(syncProvider)
}

connectZKsyncRinkeby()
