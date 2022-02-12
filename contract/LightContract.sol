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
        require(msg.sender == Owner, "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS.");
        _;
    }

    function BuyElectricity() public payable {
        require(msg.value == 1*(10**18) && VoltageState == 0, "MSG.VALUE_MUST_BE_1_ETH_AND_VOLTAGE_STATE_MUST_BE_0.");
        VoltageState = 1;
        LatestRenewalTime = block.timestamp;
        payable(Owner).transfer(1 ether);
        emit VoltageChange(VoltageState);
    }

    function OwnerManualTurnOffElectricity() public onlyOwner {
        require(VoltageState == 1, "VOLTAGE_STATE_MUST_BE_1.");
        VoltageState = 0;
        LatestRenewalTime = 0;
        emit VoltageChange(VoltageState);
    }

}
