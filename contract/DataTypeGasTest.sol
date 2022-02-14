// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract ElectricEthereum { //141457 GAS
    uint[4] public VoltageStates;
    uint[4] public ExpirationTimeUNIX;
}

contract TEST1 { //129331 GAS
    struct values{ uint VoltageStates; uint ExpirationTimeUNIX; }
    values[4] public LED;
}

contract TEST2 { //128029 GAS
    struct values{ uint VoltageStates; uint ExpirationTimeUNIX; }
    mapping(uint => values) public LED; 
}
