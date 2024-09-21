const { expect } = require("chai");
const { ethers } = require("hardhat");
const provider = ethers.provider;
const network = ethers.network;

var chai = require("chai");
const BN = require("bn.js");
chai.use(require("chai-bn")(BN));

describe("ElectricKeeper Unit Tests:", function () {
  let ElectricKeeper;
  let electricKeeperDeployed;
  let BuyDemoEightMinutes;
  let BuyDemoEightMinutesDeployed;
  let owner;
  let buyer1;
  let buyer2;
  let addrs;

  beforeEach(async function () {
    ElectricKeeper = await ethers.getContractFactory("ElectricKeeperMock");
    electricKeeperDeployed = await ElectricKeeper.deploy();
    [owner, buyer1, buyer2, ...addrs] = await ethers.getSigners();
    BuyDemoEightMinutes = await ethers.getContractFactory("BuyDemoEightMinutesMock");
    BuyDemoEightMinutesDeployed = await BuyDemoEightMinutes.deploy(electricKeeperDeployed.address);
  });

  describe("constructor()", function () {
    it("Owner is equal to default ethers.getSigners() address.", async function () {
      expect(await electricKeeperDeployed.Owner()).to.equal(owner.address);
    });
    it("ElectricRateTennessee is 0", async function () {
      expect(await electricKeeperDeployed.ElectricRateTennessee()).to.equal(0);
    });
  });

  describe("ElectricRateTennesseeAPIMock()", function () {
    it("Sets ElectricRateTennessee to 1013", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      expect(
        (await electricKeeperDeployed.ElectricRateTennessee()).toString()
      ).to.equal("1013");
    });
  });

  describe("feeInPenniesUSDinMatic()", function () {
    it("Expect 0 when input 0", async function () {
      expect(
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(0)).toString()
      ).to.equal("0");
    });
    it("return 70910000000000000 MATIC WEI when input == 1 and ElectricRateTennessee == 1013 ", async function () {
        const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
        const tx_receiptCallAPI = await transactionCallAPI.wait();
        expect(
          (await electricKeeperDeployed.feeInPenniesUSDinMatic(1)).toString()
            ).to.equal("70910000000000000");
    });
  });

  describe("BuyElectricityTimeOn()", function () {
    it("ledValue >= 8 fails", async function () {
      await expect(
        electricKeeperDeployed.BuyElectricityTimeOn(8, 1)
      ).to.be.revertedWith(
        "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_PINK_6_WHITE_7."
      );
    });
    it("ledValue == 7 && minutesToHaveOn == 0 fails", async function () {
      await expect(
        electricKeeperDeployed.BuyElectricityTimeOn(7, 0)
      ).to.be.revertedWith(
        "MUST_HAVE_MINUTES_AND_API_GREATER_THAN_0_AND_MSG_VALUE=MINUTES*FEE."
      );
    });
    it("ledValue == 7 && minutesToHaveOn == 1 && msg.value == 0 fails", async function () {
      await expect(
        electricKeeperDeployed.BuyElectricityTimeOn(7, 1)
      ).to.be.revertedWith(
        "MUST_HAVE_MINUTES_AND_API_GREATER_THAN_0_AND_MSG_VALUE=MINUTES*FEE."
      );
    });
    it("Pass buy 1 LED value", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      let maticPrice =
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(1)) /
        1000000000000000000;
      const transaction = await electricKeeperDeployed
        .connect(buyer1)
        .BuyElectricityTimeOn(7, 1, {
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_receipt = await transaction.wait();
    });
    it("Pass buy same LED renew", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      let maticPrice =
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(1)) /
        1000000000000000000;
      const transaction = await electricKeeperDeployed
        .connect(buyer1)
        .BuyElectricityTimeOn(7, 1, {
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_receipt = await transaction.wait();
      const transactionTwo = await electricKeeperDeployed
        .connect(buyer1)
        .BuyElectricityTimeOn(7, 1, {
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_receiptTwo = await transactionTwo.wait();
    });
  });

  describe("OwnerManualExpirationOff()", () => {
    it("non-owner user function call for OwnerManualExpirationOff fails", async () => {
      await expect(
        electricKeeperDeployed.connect(buyer1).OwnerManualExpirationOff()
      ).to.be.revertedWith("ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS.");
    });
    it("owner user function call for manual expiration before OwnerEmergencyDangerOff", async () => {
      await expect(
        electricKeeperDeployed.connect(owner).OwnerManualExpirationOff()
      ).to.be.revertedWith("NO_EXPIRATION_YET");
    });
    it("owner user function call for OwnerManualExpirationOff", async () => {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      let maticPrice =
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(1)) /
        1000000000000000000;
      const transaction_buy = await electricKeeperDeployed
        .connect(buyer1)
        .BuyElectricityTimeOn(7, 1, {
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_buy_receipt = await transaction_buy.wait();

      await provider.send("evm_increaseTime", [75]);
      await provider.send("evm_mine");

      const transaction = await electricKeeperDeployed
        .connect(owner)
        .OwnerManualExpirationOff();
      const tx_receipt = await transaction.wait();
    });
  });

  describe("OwnerEmergencyDangerOff()", function () {
    it("Fail if not Owner", async function () {
      await expect(
        electricKeeperDeployed.connect(buyer1).OwnerEmergencyDangerOff(8)
      ).to.be.revertedWith(
        "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS."
      );
    });
    it("Fail if not a valid LED value", async function () {
      await expect(
        electricKeeperDeployed.OwnerEmergencyDangerOff(8)
      ).to.be.revertedWith(
        "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_PINK_6_WHITE_7."
      );
    });
    it("Fail if requested LED is not on", async function () {
      await expect(
        electricKeeperDeployed.OwnerEmergencyDangerOff(7)
      ).to.be.revertedWith(
        "VOLTAGE_NOT_ON."
      );
    });
    it("Pass if requested LED is on", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      let maticPrice =
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(1)) /
        1000000000000000000;
      const transaction = await electricKeeperDeployed
        .connect(buyer1)
        .BuyElectricityTimeOn(7, 1, {
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_receipt = await transaction.wait();
      const transaction2 = await electricKeeperDeployed.OwnerEmergencyDangerOff(7)
      const tx_receipt2 = await transaction2.wait();
    });
  });

  describe("OwnerEmergencySafeOn()", function () {
    it("Fail if not Owner", async function () {
      await expect(
        electricKeeperDeployed.connect(buyer1).OwnerEmergencySafeOn(8)
      ).to.be.revertedWith(
        "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS."
      );
    });
    it("Fail if not a valid LED value", async function () {
      await expect(
        electricKeeperDeployed.OwnerEmergencySafeOn(8)
      ).to.be.revertedWith(
        "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_PINK_6_WHITE_7."
      );
    });
    it("Fail if requested LED is in Emergency off state", async function () {
      await expect(
        electricKeeperDeployed.OwnerEmergencySafeOn(7)
      ).to.be.revertedWith(
        "VOLTAGE_NOT_IN_EMERGENCY_OFF_STATE."
      );
    });
    it("Pass if requested LED is in Emergency off state", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      let maticPrice =
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(1)) /
        1000000000000000000;
      const transaction = await electricKeeperDeployed
        .connect(buyer1)
        .BuyElectricityTimeOn(7, 1, {
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_receipt = await transaction.wait();
      const transaction2 = await electricKeeperDeployed.OwnerEmergencyDangerOff(7)
      const tx_receipt2 = await transaction2.wait();
      const transaction3 = await electricKeeperDeployed.OwnerEmergencySafeOn(7)
      const tx_receipt3 = await transaction3.wait();
    });
  });

  describe("BuyTestEightMinuteCountdown()", function () {
    it("Fail if MSG.VALUE=0.", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      await expect(
        BuyDemoEightMinutesDeployed.BuyTestEightMinuteCountdown()
      ).to.be.revertedWith(
        "MUST_HAVE_MSG_VALUE=36*FEE."
      );
    });
    it("Pass if MSG.VALUE=feeInPenniesUSDinMatic(36)", async function () {
      const transactionCallAPI = await electricKeeperDeployed.ElectricRateTennesseeAPIMock();
      const tx_receiptCallAPI = await transactionCallAPI.wait();
      let maticPrice =
        (await electricKeeperDeployed.feeInPenniesUSDinMatic(36)) /
        1000000000000000000;
      const transaction = await BuyDemoEightMinutesDeployed
        .connect(buyer1)
        .BuyTestEightMinuteCountdown({
          value: ethers.utils.parseEther(maticPrice.toString()),
        });
      const tx_receipt = await transaction.wait();
    });
  });
});
