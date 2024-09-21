// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface IElectricKeeper {
    // custom errors
    error InvalidLedValue();
    error OracleValueZero();
    error MsgValueTooSmall();
    error EtherNotSent();
    error NoExpirationYet();
    error VoltageNotOn();
    error VoltageNotInEmergencyOffState();
    error UnexpectedRequestID(bytes32 requestId);
    
    // events
    event VoltageChange();
    event Response(
        bytes32 indexed requestId,
        uint256 value,
        bytes response,
        bytes err
    );

}