const { expect } = require("chai");
const { ethers } = require("hardhat");
provider = ethers.provider;

var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));

describe("Electric Keeper Buyer Tests:", function () {

      let ElectricKeeper;
      let electricKeeperDeployed;
      let owner;
      let buyer1;
      let buyer2;
      let addrs;

      beforeEach(async function () {

        ElectricKeeper = await ethers.getContractFactory('ElectricKeeper');
        electricKeeperDeployed = await ElectricKeeper.deploy();
        [owner, buyer1, buyer2, ...addrs] = await ethers.getSigners();
        await electricKeeperDeployed.deployed();
      });

      describe("Constructor", function () {
          it("Owner is equal to default ethers.getSigners() address.", async function () {
              expect(await electricKeeperDeployed.Owner()).to.equal(owner.address);
          });
       });

/*        describe("mockOwnerAddFunds", function () {
         it("msg.sender == Owner", async function () {
           await expect(electricKeeperDeployed.connect(buyer1).mockOwnerAddFunds()).to.be.revertedWith("Only contract owner can interact with this contract");
         });
         it("require(msg.value == 1*(10**18)", async function () {
           await expect(electricKeeperDeployed.mockOwnerAddFunds()).to.be.revertedWith("You must send one ETH for msg.value");
         });
        });

      describe("BuyerCreatePolicy", function () {
        it("Day<0.", async function () {
          await expect(electricKeeperDeployed.BuyerCreatePolicy(500,-500)).to.be.revertedWith("Present time not recorded yet by oracle.");
        });
        it("Owner != msg.sender", async function () {
          await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
          await expect(electricKeeperDeployed.BuyerCreatePolicy(500,-500)).to.be.revertedWith("Error: Owner cannot self-insure");
        });
        it("OpenWEItoInsure > 0", async function () {
          await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
          await expect(electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(500,-500)).to.be.revertedWith("There is no open ETH in the contract currently.");
        });
        it("msg.value == (1*10**16)", async function () {
          await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
          await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
          await expect(electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(500,-500)).to.be.revertedWith("Error: Please submit your request with insurance contribution of 0.001 Ether");
        });
        it("OpenWEItoInsure and OpenWEItoInsure check", async function () {
          await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
          await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
          const transaction = await electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(500,-500, { value: ethers.utils.parseEther("0.01") } )
          const tx_receipt = await transaction.wait()
          result1 = await electricKeeperDeployed.OpenWEItoInsure();
          result2 = await electricKeeperDeployed.LockedWEItoPolicies();
          expect((new ethers.BigNumber.from(result1._hex).toString())).to.be.a.bignumber.that.is.equal(new ethers.BigNumber.from('0').toString())
          expect((new ethers.BigNumber.from(result2._hex).toString())).to.be.a.bignumber.that.is.equal(new ethers.BigNumber.from('1000000000000000000').toString())
        });
        it("Error: You've already purchased insurance", async function () {
          await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
          await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
          await electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(500,-500, { value: ethers.utils.parseEther("0.01") }   );
          await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
          await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
          await expect(electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(500,-500, { value: ethers.utils.parseEther("0.01") } ) ).to.be.revertedWith("Error: You've already purchased insurance");
        });
      });

      describe("BuyerClaimReward", function () {
          it("DayEruption>0.", async function () {
            await expect(electricKeeperDeployed.BuyerClaimReward()).to.be.revertedWith("DayEruption not recorded yet by oracle.");
          });
          it("MonthEruption>0.", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,0,1,0,0)
            await expect(electricKeeperDeployed.BuyerClaimReward()).to.be.revertedWith("MonthEruption not recorded yet by oracle.");
          });
          it("YearEruption>0.", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,0,1,1,0)
            await expect(electricKeeperDeployed.BuyerClaimReward()).to.be.revertedWith("YearEruption not recorded yet by oracle.");
          });
          it("LatitudeEruption != 0 || LongitudeEruption != 0", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,0,1,1,2020)
            await expect(electricKeeperDeployed.BuyerClaimReward()).to.be.revertedWith("Lat and Long cannot both be 0. Wait for oracle response.");
          });
          it("policies[msg.sender].EthereumAwardTiedToAddress > 0", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,100,1,1,2020)
            await expect(electricKeeperDeployed.BuyerClaimReward()).to.be.revertedWith("Error: You don't have a policy");
          });
          it("convert.DateCompareForm(policies[msg.sender].YearSigned,policies[msg.sender].MonthSigned,policies[msg.sender].DaySigned) < convert.DateCompareForm(YearEruption,MonthEruption,DayEruption)", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,100,1,1,2019)
            await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
            await electricKeeperDeployed.mockOraclePresentTime(1,1,2020)
            await electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(0,100, { value: ethers.utils.parseEther("0.01") }   );
            await expect(electricKeeperDeployed.connect(buyer1).BuyerClaimReward()).to.be.revertedWith("Policy was signed after eruption");
          });
          it("policies[msg.sender].LongitudeInsured >=  (LongitudeEruption-100) && policies[msg.sender].LongitudeInsured <=  (LongitudeEruption+100)", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,2,1,1,2020)
            await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
            await electricKeeperDeployed.mockOraclePresentTime(1,1,2019)
            await electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(0,1000, { value: ethers.utils.parseEther("0.01") }   );
            await expect(electricKeeperDeployed.connect(buyer1).BuyerClaimReward()).to.be.revertedWith("Must be within 1 long coordinate point.");
          });
          it("policies[msg.sender].LatitudeInsured >=  (LatitudeEruption-100) && policies[msg.sender].LatitudeInsured <=  (LatitudeEruption+100)", async function () {
            await electricKeeperDeployed.mockOracleVolcano(0,2,1,1,2020)
            await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
            await electricKeeperDeployed.mockOraclePresentTime(1,1,2019)
            await electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(1000,2, { value: ethers.utils.parseEther("0.01") }   );
            await expect(electricKeeperDeployed.connect(buyer1).BuyerClaimReward()).to.be.revertedWith("Must be within 1 lat coordinate point.");
          });
          it("LockedWEItoPolicies -=(1*(10**18));", async function () {
            await electricKeeperDeployed.mockOracleVolcano(3,2,1,1,2020)
            await electricKeeperDeployed.mockOwnerAddFunds({ value: ethers.utils.parseEther("1") })
            await electricKeeperDeployed.mockOraclePresentTime(1,1,2019)
            await electricKeeperDeployed.connect(buyer1).BuyerCreatePolicy(3,2, { value: ethers.utils.parseEther("0.01") }   );
            const transaction = await electricKeeperDeployed.connect(buyer1).BuyerClaimReward();
            const tx_receipt = await transaction.wait()
            const result1 = await electricKeeperDeployed.LockedWEItoPolicies();
            expect((new ethers.BigNumber.from(result1._hex).toString())).to.be.a.bignumber.that.is.equal(new ethers.BigNumber.from('0').toString())
          });
      }); */

});