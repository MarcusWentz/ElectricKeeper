// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract OnePennyUSDinMatic {

    AggregatorV3Interface internal priceFeed;
    address Owner;

    constructor() {
        Owner = msg.sender;
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }
    
    function getLatestPrice() public view returns (uint) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return uint( (1 * 10 ** 18 / price) * 10 ** 6);
    }

    function payPenny() public payable {
        require(msg.value == getLatestPrice() , "MSG_VALUE_DOES_NOT_MATCH_PRICEFEED_CONVERSION.");
        payable(Owner).transfer(address(this).balance);
    }
}
