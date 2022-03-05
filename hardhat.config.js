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
    compilers: [{version: "0.8.0"},
    {version: "0.8.7"},
    {version: "0.8.10"},
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