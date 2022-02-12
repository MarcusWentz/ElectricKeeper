// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract LightContract {

    uint public VoltageState;
    uint public LatestRenewalTime;
    address public immutable Owner;
    event VoltageChange (uint State);

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner);
        _;
    }

    function BuyElectricity() public payable {
        require(msg.value == 1*(10**18) && VoltageState == 0);
        VoltageState = 1;
        LatestRenewalTime = block.timestamp;
        payable(Owner).transfer(1 ether);
        emit VoltageChange(VoltageState);
    }

    function OwnerManualTurnOffElectricity() public onlyOwner {
        require(VoltageState == 1);
        VoltageState = 0;
        LatestRenewalTime = 0;
        emit VoltageChange(VoltageState);
    }

}
