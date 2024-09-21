// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface ILightShowVRF {
    // custom errors

    // events
    event randomRequest(uint256 indexed requestId);
    event randomNumberResult(uint256 indexed requestId, uint256[] indexed result);
    event lightShowUpdate();

}