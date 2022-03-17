// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract VRFv2LightShow is VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;
  LinkTokenInterface LINKTOKEN;

  uint256[] public twoRandomWords;
  uint256 requestId; 
  event lightShowUpdate();

  constructor() VRFConsumerBaseV2(0x6168499c0cFfCaCD319c818142124B7A15E857ab) {
    COORDINATOR = VRFCoordinatorV2Interface(0x6168499c0cFfCaCD319c818142124B7A15E857ab);
    LINKTOKEN = LinkTokenInterface(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
  }

  function requestRandomWords() external {
      requestId = COORDINATOR.requestRandomWords(
      0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc, //keyHash
      529,    //subscriptionId [Get your ID here https://vrf.chain.link/]
      3,      //Confirmations
      100000, //callbackGasLimit
      2       //numWords
    );
  }
  
  function fulfillRandomWords(uint256,  uint256[] memory randomWords) internal override {
    twoRandomWords = randomWords;
    emit lightShowUpdate();
  }

}
