// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract TwoArrays { //186999 GAS
    uint[4] public VoltageStates;
    uint[4] public ExpirationTimeUNIX;
    constructor() {
        VoltageStates[0] = 1;
        ExpirationTimeUNIX[0] = 1;
    }
}

contract OneStructOneArray { //175077 GAS
    struct values{ uint VoltageStates; uint ExpirationTimeUNIX; }
    values[4] public LED;
    constructor() {
        LED[0].VoltageStates = 1;
        LED[0].ExpirationTimeUNIX = 1;
    }
}

contract OneMappingOneStruct { //173229 GAS 
    struct values{ uint VoltageStates; uint ExpirationTimeUNIX; }
    mapping(uint => values) public LED; 
    constructor() {
        LED[0].VoltageStates = 1;
        LED[0].ExpirationTimeUNIX = 1;
    }
}
