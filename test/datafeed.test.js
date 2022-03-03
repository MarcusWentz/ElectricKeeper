let assert = require("assert");
let Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://speedy-nodes-nyc.moralis.io/5b34833e0a70355555765b4f/polygon/mumbai"
  )
);
const CONTRACT_ADDRESS = "0x3231A32ed0B2234Ebe88A0b1476B2b00c75BA144";
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payPenny",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const maticPriceFeedContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

describe("Data feed contract for getting matic price data using chainlink oracles", () => {
  it("Quantity of matic that $0.01 buys is greater than 0", async () => {
    let maticPriceWei = await maticPriceFeedContract.methods
      .getLatestPrice()
      .call();
    assert(maticPriceWei > 0);
  });
});
