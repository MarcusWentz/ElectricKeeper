// SPDX-License-Identifier: MIT 
pragma solidity 0.8.11;

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
        require(ledValue >= 0 && ledValue < 4, "LED_VALUES_ALLOWED_ARE_RED_0_BLUE_1_GREEN_2_YELLOW_3.");
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

    function OwnerManualTurnOffElectricity() public onlyOwner {
        require( (block.timestamp > LED[0].ExpirationTimeUNIX && LED[0].Voltage == 1) || 
                 (block.timestamp > LED[1].ExpirationTimeUNIX && LED[1].Voltage == 1) || 
                 (block.timestamp > LED[2].ExpirationTimeUNIX && LED[2].Voltage == 1) || 
                 (block.timestamp > LED[3].ExpirationTimeUNIX && LED[3].Voltage == 1)   , "NO_EXPIRATION_YET.");
        if(block.timestamp > LED[0].ExpirationTimeUNIX && LED[0].Voltage == 1){
            LED[0].Voltage  = 0;
            LED[0].ExpirationTimeUNIX = 0;
            LED[0].LatestBuyer = 0x0000000000000000000000000000000000000000;
        }
        if(block.timestamp > LED[1].ExpirationTimeUNIX && LED[1].Voltage == 1){
            LED[1].Voltage  = 0;
            LED[1].ExpirationTimeUNIX = 0;
            LED[1].LatestBuyer = 0x0000000000000000000000000000000000000000;
        }
        if(block.timestamp > LED[2].ExpirationTimeUNIX && LED[2].Voltage == 1){
            LED[2].Voltage  = 0;
            LED[2].ExpirationTimeUNIX = 0;
            LED[2].LatestBuyer = 0x0000000000000000000000000000000000000000;
        }
        if(block.timestamp > LED[3].ExpirationTimeUNIX && LED[3].Voltage == 1){
            LED[3].Voltage  = 0;
            LED[3].ExpirationTimeUNIX = 0;
            LED[3].LatestBuyer = 0x0000000000000000000000000000000000000000;
        }
        emit VoltageChange();
    }
}
