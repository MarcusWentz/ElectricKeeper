// SPDX-License-Identifier: MIT 
pragma solidity 0.8.12;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ElectricKeeper is KeeperCompatibleInterface { 

    AggregatorV3Interface internal priceFeed;

    struct STATE{ uint Voltage; uint ExpirationTimeUNIX; }
    mapping(uint => STATE) public LED; 
    address public immutable Owner;
    event VoltageChange();

    constructor() {
        Owner = msg.sender;
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS.");
        _;
    }

    modifier validLEDvalues(uint ledValue) {
        require(ledValue >= 0 && ledValue < 8, "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_PINK_6_WHITE_7.");
        _;
    }

    function onePennyUSDinMatic(uint scaleMinutes) public view returns (uint) {
        (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();
        return scaleMinutes*uint( (10**24) / price );
    }

    function expirationOccured() public view returns(bool) {
        for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            if((LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX)){
                return true;
            }
        }
        return false;
    }

    function BuyElectricityTimeOn(uint ledValue, uint minutesToHaveOn) public payable validLEDvalues(ledValue) {
        require(minutesToHaveOn > 0 && msg.value == (onePennyUSDinMatic(minutesToHaveOn)), "MUST_HAVE_MINUTES_GREATER_THAN_0_AND_MSG_VALUE=MINUTES*FEE.");
        if(LED[ledValue].Voltage == 0) {
            LED[ledValue].Voltage = 1;
            LED[ledValue].ExpirationTimeUNIX = block.timestamp + (60*minutesToHaveOn); 
        } else {
            LED[ledValue].ExpirationTimeUNIX  += (60*minutesToHaveOn); 
        }
        emit VoltageChange();
        payable(Owner).transfer(address(this).balance);
    }

    function checkUpkeep(bytes calldata) external override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = expirationOccured();
    } 

    function performUpkeep(bytes calldata) external override {
        for(uint ledValue = 0; ledValue < 8; ledValue++) {
            if(LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
            }
        }
        emit VoltageChange();
    }

    function OwnerManualExpirationOff() public onlyOwner {
        require(expirationOccured() , "NO_EXPIRATION_YET.");
        for(uint ledValue = 0; ledValue < 8; ledValue++) {
            if(LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
            }
        }
        emit VoltageChange();
    }

    function OwnerEmergencyDangerOff(uint ledValue) public onlyOwner validLEDvalues(ledValue) {
        require(LED[ledValue].Voltage == 1, "VOLTAGE_NOT_ON.");
        LED[ledValue].Voltage  = 2;
        LED[ledValue].ExpirationTimeUNIX -= block.timestamp;
        emit VoltageChange();
    }

    function OwnerEmergencySafeOn(uint ledValue) public onlyOwner validLEDvalues(ledValue) {
        require(LED[ledValue].Voltage == 2, "VOLTAGE_NOT_IN_EMERGENCY_OFF_STATE.");
        LED[ledValue].Voltage  = 1;
        LED[ledValue].ExpirationTimeUNIX += block.timestamp;
        emit VoltageChange();
    }

}

contract BuyDemoEightMinutes {

    ElectricKeeper electricKeeperInstance;

    constructor(ElectricKeeper electricKeeperAddress) {
        electricKeeperInstance = ElectricKeeper(electricKeeperAddress);
    }

    function BuyTestEightMinuteCountdown() public payable {
       require(msg.value == electricKeeperInstance.onePennyUSDinMatic(36), "MUST_HAVE_MSG_VALUE=36*FEE.");
       for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            electricKeeperInstance.BuyElectricityTimeOn{value: electricKeeperInstance.onePennyUSDinMatic(ledValue+1)}(ledValue,ledValue+1);
        }
    }
}
