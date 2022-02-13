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

    function BuyElectricityTimeOn(uint ledValue) public payable {
        require(ledValue >= 0 && ledValue < 4);
        require(msg.value == 1*(10**18), "MSG.VALUE_MUST_BE_1_ETH.");
        if(ExpirationTimeUNIX[ledValue] == 0) {
            VoltageStates[ledValue] = 1;
            ExpirationTimeUNIX[ledValue] = block.timestamp + 60; 
        } else {
            ExpirationTimeUNIX[ledValue] += 60; 
        }
        emit VoltageChange(VoltageStates);
        payable(Owner).transfer(1 ether);
    }

    function OwnerManualTurnOffElectricity(uint ledValue) public onlyOwner {
        require(ledValue >= 0 && ledValue < 4);
        require(block.timestamp > ExpirationTimeUNIX[ledValue] && VoltageStates[ledValue] == 1, "NOT_EXPIRED_YET_AND_VOLTAGE_STATE_MUST_BE_1.");
        //NEED TO BREAK INTO 4 SECTIONS 
        VoltageStates[ledValue] = 0;
        ExpirationTimeUNIX[ledValue] = 0;
        emit VoltageChange(VoltageStates);
    }
}
