require("@nomiclabs/hardhat-ethers");
require('solidity-coverage');

const MUMBAI_RPC_URL = process.env.mumbaiInfuraAPI
const PRIVATE_KEY = process.env.devTestnetPrivateKey

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
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
