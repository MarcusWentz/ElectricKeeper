// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface IElectricKeeper {
    // custom errors
    error invalidLedValue();

    // events
    event VoltageChange();

}