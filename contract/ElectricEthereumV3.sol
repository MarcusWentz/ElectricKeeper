// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract ElectricEthereum {

    uint[4] public VoltageStates;
    uint[4] public ExpirationTimeUNIX;
    address public immutable Owner;
    event VoltageChange (uint[4] State);

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS.");
        _;
    }

    function BuyElectricityTimeOn(uint ledValue, uint minutesToHaveOn) public payable {
        require(ledValue >= 0 && ledValue < 4);
        require(msg.value == minutesToHaveOn*1*(10**18), "MSG.VALUE_MUST_BE_1_ETH.");
        if(ExpirationTimeUNIX[ledValue] == 0) {
            VoltageStates[ledValue] = 1;
            ExpirationTimeUNIX[ledValue] = block.timestamp + (60*minutesToHaveOn); 
        } else {
            ExpirationTimeUNIX[ledValue] += (60*minutesToHaveOn); 
        }
        emit VoltageChange(VoltageStates);
        payable(Owner).transfer(1 ether);
    }

    function OwnerManualTurnOffElectricity() public onlyOwner {
        require( (block.timestamp > ExpirationTimeUNIX[0] && VoltageStates[0] == 1) || 
                 (block.timestamp > ExpirationTimeUNIX[1] && VoltageStates[1] == 1) || 
                 (block.timestamp > ExpirationTimeUNIX[2] && VoltageStates[2] == 1) || 
                 (block.timestamp > ExpirationTimeUNIX[3] && VoltageStates[3] == 1)   , "NO_EXPIRATION_YET.");
        if(block.timestamp > ExpirationTimeUNIX[0] && VoltageStates[0] == 1){
            VoltageStates[0] = 0;
            ExpirationTimeUNIX[0] = 0;
        }
        if(block.timestamp > ExpirationTimeUNIX[1] && VoltageStates[1] == 1){
            VoltageStates[1] = 0;
            ExpirationTimeUNIX[1] = 0;
        }
        if(block.timestamp > ExpirationTimeUNIX[2] && VoltageStates[2] == 1){
            VoltageStates[2] = 0;
            ExpirationTimeUNIX[2] = 0;
        }
        if(block.timestamp > ExpirationTimeUNIX[3] && VoltageStates[3] == 1){
            VoltageStates[3] = 0;
            ExpirationTimeUNIX[3] = 0;
        }
        emit VoltageChange(VoltageStates);
    }
}
