// SPDX-License-Identifier: MIT 
pragma solidity 0.8.12;

contract ElectricEthereum { 

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
        require(expirationOccured() < 8, "NO_EXPIRATION_YET.");
        for(uint ledValue = expirationOccured(); ledValue < 8; ledValue++) {
            if(block.timestamp > LED[ledValue].ExpirationTimeUNIX && LED[ledValue].Voltage == 1){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
                LED[ledValue].LatestBuyer = 0x0000000000000000000000000000000000000000;
            }
        }
        emit VoltageChange();
    }

    function expirationOccured() public view returns(uint) {
        for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            if((block.timestamp > LED[ledValue].ExpirationTimeUNIX && LED[ledValue].Voltage == 1)){
                return ledValue;
            }
        }
        return 8;
    }

}

contract BuyTestAllColors {

    ElectricEthereum electricEthereum;

    constructor(ElectricEthereum _electricEthereum) {
        electricEthereum = ElectricEthereum(_electricEthereum);
    }

    function BuyAllLEDs() public payable {
    require(msg.value == 8);
       for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            electricEthereum.BuyElectricityTimeOn{value: 1}(ledValue,1);
        }
    }
}
