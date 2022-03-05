require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require('dotenv').config();

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    compilers: [{version: "0.8.12"},
    {version: "0.8.12"},
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
    sources: "./contract",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 3000000
  }
}