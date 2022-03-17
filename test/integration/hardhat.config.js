require("@nomiclabs/hardhat-ethers");
require('solidity-coverage');
// require("@nomiclabs/hardhat-etherscan");

const MUMBAI_RPC_URL = process.env.MUMBAI_API_KEY
const RINKEBY_RPC_URL = process.env.RINKEBY_API_KEY
const PRIVATE_KEY = process.env.PRVIATE_KEY

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY]
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  // etherscan: {
  //   apiKey: process.env.PolyscanApiKey
  // },
  solidity: {
    compilers: [{version: "0.8.0"},
    {version: "0.8.7"},
    {version: "0.8.12"},
    {version: "0.6.6"}],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 3000000
  }
}
