// SPDX-License-Identifier: MIT 
pragma solidity 0.8.12;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract ElectricEthereum is KeeperCompatibleInterface { 

    struct STATE{ uint Voltage; uint ExpirationTimeUNIX; address LatestBuyer; }
    mapping(uint => STATE) public LED; 
    address public immutable Owner;
    event VoltageChange();

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS.");
        _;
    }

    function BuyElectricityTimeOn(uint ledValue, uint minutesToHaveOn) public payable {
        require(ledValue >= 0 && ledValue < 8, "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_GREY_6_WHITE_7.");
        require(msg.value == minutesToHaveOn && minutesToHaveOn > 0, "MSG.VALUE_MUST_BE_1_WEI_TIMES_MINUTES_AND_NOT_BE_ZERO.");
        if(LED[ledValue].Voltage == 0) {
            LED[ledValue].Voltage = 1;
            LED[ledValue].ExpirationTimeUNIX = block.timestamp + (60*minutesToHaveOn); 
        } else {
            LED[ledValue].ExpirationTimeUNIX  += (60*minutesToHaveOn); 
        }
        LED[ledValue].LatestBuyer = msg.sender;
        emit VoltageChange();
        payable(Owner).transfer(address(this).balance);
    }

    function TurnOffElectricity() public onlyOwner {
        require(expirationOccured() , "NO_EXPIRATION_YET.");
        for(uint ledValue = 0; ledValue < 8; ledValue++) {
            if(block.timestamp > LED[ledValue].ExpirationTimeUNIX && LED[ledValue].Voltage == 1){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
                LED[ledValue].LatestBuyer = 0x0000000000000000000000000000000000000000;
            }
        }
        emit VoltageChange();
    }

    function expirationOccured() public view returns(bool) {
        for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            if((block.timestamp > LED[ledValue].ExpirationTimeUNIX && LED[ledValue].Voltage == 1)){
                return true;
            }
        }
        return false;
    }

    function checkUpkeep(bytes calldata) external override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = expirationOccured();
    } 

    function performUpkeep(bytes calldata) external override {
        for(uint ledValue = 0; ledValue < 8; ledValue++) {
            if(block.timestamp > LED[ledValue].ExpirationTimeUNIX && LED[ledValue].Voltage == 1){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
                LED[ledValue].LatestBuyer = 0x0000000000000000000000000000000000000000;
            }
        }
        emit VoltageChange();
    }

}

contract BuyTestAllColors {

    ElectricEthereum electricEthereum;

    constructor(ElectricEthereum _electricEthereum) {
        electricEthereum = ElectricEthereum(_electricEthereum);
    }

    function BuyAllSameDuration() public payable {
       require(msg.value == 8, "NEED_8_WEI.");
       for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            electricEthereum.BuyElectricityTimeOn{value: 1}(ledValue,1);
        }
    }

    function BuyAllTurnOffSlowly() public payable {
       require(msg.value == 36, "NEED_36_WEI.");
       for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            electricEthereum.BuyElectricityTimeOn{value: ledValue+1}(ledValue,ledValue+1);
        }
    }
}
