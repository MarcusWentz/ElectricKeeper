const chai = require("chai");
const BN = require("bn.js");

// Enable and inject BN dependency
chai.use(require("chai-bn")(BN));

describe("Johannas Unit Test", function () {
  before(async function () {
    ElectricKeeper = await ethers.getContractFactory("ElectricKeeper");
    electricKeeper = await ElectricKeeper.deploy();
    await electricKeeper.deployed();
  });

  beforeEachTest(async function () {
    await electricKeeper.setAFunctionFromSmartContractToZero(0);
  });


  //Below are 3 unit example test
  it("Initial value is set to 0", async function () {
    expect((await electricKeeper.getNumber()).toString()).to.equal("0");
  });

  it("retrieve returns a value previously stored", async function () {
    await electricKeeper.setNumber(77);
    expect((await electricKeeper.getNumber()).toString()).to.equal("77");
  });

  it("gets a price feed value", async function () {
    let result = await electricKeeper.getLatestPrice();
    console.log("price:" + new ethers.BigNumber.from(result._hex).toString());
    expect(new ethers.BigNumber.from(result._hex).toString())
      .equals(INITIAL_PRICE)
      .toString();
  });
});
